'use strict';

var Field = require('../field/Field');
var Player = require('../player/Player');
var Phases = require('../phases/Phases');
var Sockets = require('../../Socket');

function Game() {
  let self = {},
      phases = Phases();

  self.players = {
    list: {},
    ids: [],

    setIds: function() {
      self.players.ids = Object.keys(self.players.list);
    },

    add: function(id) {
      self.players.list[id] = Player(id);
      self.players.setIds();
    },

    get: function(id) {
      return self.players.find(player => {
        return player.id == id;
      })
    },

    remove: function(id) {
      delete self.players.list[id];
      self.players.setIds();
    },

    /*
    * Check whether all players are set as 'ready'.
    * @returns true if all players are 'ready'
    */
    areReady: function() {
      return Object.keys(self.players.list).filter(id => {
        return !self.players.list[id].ready
      }).length == 0;
    },

    /*
    * Set a player as 'ready'. If all players are ready, do the next event
    */
    ready: function(id) {
      self.players.list[id].ready = true;
      if (self.players.areReady()) {
        self.players.unready(); // reset players' ready status
        next();
      }
    },

    /*
    * Set all players' 'ready' status as false
    */
    unready: function() {
      for (var id in self.players.list) {
        self.players.list[id].ready = false;
      }
    }
  };

  function setup() {
    self.field = Field();
    self.players.list = Player.list,
    self.settings = {
      me: "PLAYER_ONE",
      opponent: "PLAYER_TWO"
    },
    self.phase = null;
  }

  /*
  * Remove a card from the player's hand
  * @param playerId ID of player
  * @param cardId ID of card to remove
  * @returns Object with card details, player's updated CP and break zone
  */
  self.discard = function(playerId, cardId) {
    let player = self.players.list[playerId],
        card = player.removeCard(cardId);

    return {
      "player": playerId,
      "card": card,
      "cp": player.cp.update(2, card.element),
      "break": self.field.addCard(playerId, card, "break")
    };
  }

  /*
  * Play a card to the field from the player's hand
  * @param playerId
  * @param cardId
  * @returns Object the player's ID, card details and player's new CP
  */
  self.playCard = function(playerId, cardId) {
    let player = self.players.list[playerId],
        card = player.playCard(cardId);

    self.field.addCard(playerId, card, card.type);

    return {
      "player": playerId,
      "card": card,
      "cp": player.resetCP()
    };
  }

  self.dullCard = function(playerId, cardId) {
    let player = self.players.list[playerId],
        card = self.field.dullCard(playerId, cardId);

    return card;
  }

  /*
  * Execute the next part of the phase, or begin the next phase
  */
  function next() {
    phases.execute(self.field).then(function() {
      Sockets.send.player(self);
    });
  }

  /*
  * Get the ID of the player who will start the game
  */
  function getStartPid() {
    return Object.keys(self.players.list)[Math.floor(Math.random() * 2)];
  }

  /*
  * Start the game.
  */
  function start() {
    phases.start(getStartPid(), self.players.list);
    self.phase = phases.current().getPack();
    return new Promise((resolve) => {
      phases.execute(self.field).then(function() {
        resolve();
      });
    });
  }

  /*
  * Check whether the game is ready to start
  * @returns true if the game is ready to start
  */
  function ready() {
    return Object.keys(self.players.list).length == 2;
  }

  self.initialize = function() {
    if (ready()) {
      self.field.initialize(self.players.list);
      start().then(function() {
        Sockets.send.initial(self);
        Sockets.send.player(self);
      });
    }
  }

  self.end = function() {
    setup();
    for (var id in self.players.list) {
      Sockets.list[id].emit('endGame');
    }
  }

  setup();

  return self;
}

module.exports = Game;
