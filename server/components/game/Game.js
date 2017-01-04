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
    ids: {
      list: [],

      /**
      * Set the list of ids of playing players
      */
      set: function() {
        self.players.ids.list = Object.keys(self.players.list);
      }
    },

    /**
    * Add a player to the game
    * @param pid {String} The id of the player to add
    */
    add: function(pid) {
      self.players.list[pid] = Player(pid);
      self.players.ids.set();
    },

    /**
    * Get a playing player by their id
    * @param pid {String} the id of the player to get
    * @returns {Player} the player, or undefined if they are not found
    */
    get: function(pid) {
      return self.players.find(player => {
        return player.id == pid;
      })
    },

    remove: function(pid) {
      delete self.players.list[pid];
      self.players.ids.set();
    },

    /**
    * Check whether all players are set as 'ready'.
    * @returns {true} if all players are 'ready'
    */
    areReady: function() {
      return Object.keys(self.players.list).filter(id => {
        return !self.players.list[id].ready
      }).length == 0;
    },

    /**
    * Set a player as 'ready'. If all players are ready, do the next event
    * @param pid {String} the id of the player to set to ready
    */
    ready: function(pid) {
      self.players.list[pid].ready = true;
      if (self.players.areReady()) {
        self.players.unready(); // reset players' ready status
        next();
      }
    },

    /**
    * Set all players' 'ready' status as false
    */
    unready: function() {
      for (var pid in self.players.list) {
        self.players.list[pid].ready = false;
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

  /**
  * Remove a card from the player's hand
  * @param pid {String} id of player
  * @param cid {String} id of card to remove
  * @returns {Object} with card details, player's updated CP and break zone
  */
  self.discard = function(pid, cid) {
    let player = self.players.list[pid],
        card = player.hand.remove(cid);

    return {
      "player": pid,
      "card": card,
      "cp": player.cp.update(2, card.element),
      "break": self.field.addCard(pid, card, "break")
    };
  }

  /**
  * Play a card to the field from the player's hand
  * @param pid {String}
  * @param cid {String}
  * @returns {Object} the player's id, card details and player's new CP
  */
  self.playCard = function(pid, cid) {
    let player = self.players.list[pid],
        card = player.play(cid);

    self.field.addCard(pid, card, card.type);
    player.cp.reset();

    return {
      "player": pid,
      "card": card,
      "cp": player.cp.pack()
    };
  }

  self.dullCard = function(pid, cid) {
    let player = self.players.list[pid],
        card = self.field.dullCard(pid, cid);

    return card;
  }

  /**
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
    return self.players.ids.list[Math.floor(Math.random() * 2)];
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
