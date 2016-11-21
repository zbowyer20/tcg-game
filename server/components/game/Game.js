'use strict';

var Field = require('../field/Field');
var Player = require('../player/Player');

function Game() {
  var self = {}

  function setup() {
    self.field = Field();
    self.players = Player.list,
    self.settings = {
      me: "PLAYER_ONE",
      opponent: "PLAYER_TWO"
    };
  }

  self.addPlayer = function(id) {
    Player.list[id] = Player(id);
  }

  self.getPlayer = function(id) {
    return self.players.find(player => {
      return player.id == id;
    });
  }

  self.removePlayer = function(id) {
    delete Player.list[id];
  }

  self.draw = function(id) {
    let card = self.field.draw(id);
    Player.list[id].addCard(card);
    return card;
  }

  self.discard = function(playerId, cardId) {
    let player = Player.list[playerId],
        card = player.removeCard(cardId);

    return {
      "player": playerId,
      "card": card,
      "cp": player.updateCP(2, card.element),
      "break": self.field.addCard(playerId, card, "break")
    };
  }

  self.playCard = function(playerId, cardId) {
    let player = Player.list[playerId],
        card = player.playCard(cardId);

    self.field.addCard(playerId, card, card.type);

    return {
      "player": playerId,
      "card": card,
      "cp": player.resetCP()
    };
  }

  self.dullCard = function(playerId, cardId) {
    let player = Player.list[playerId],
        card = self.field.dullCard(playerId, cardId);

    return card;
  }

  function ready() {
    return Object.keys(self.players).length == 2;
  }

  function initializeField() {
    for (var id in self.players) {
      self.field.addPlayer(id);
    }
  }

  self.initialize = function(socketList) {
    if (ready()) {
      initializeField();
      for (var id in Player.list) {
        let configuredGame = Object.assign({}, self, {
          settings: Player.buildPack(id)
        })
        socketList[id].emit('init', {
          game: configuredGame
        });
      }
    }
  }

  function shouldSendData(id, data, options) {
    if (options.otherPlayers) {
      return id != data.id
    };
    return true;
  }

  function getData(options) {
    if (options.type == 'opponent') {
      return Player.list[options.id].getPublicPack();
    }
    return null;
  }

  self.sendData = function(socketList, options) {
    let data = getData(options);
    if (data) {
      for (var id in Player.list) {
        if (shouldSendData(id, data, options)) {
          socketList[id].emit(options.type, data);
        }
      }
    }
  }

  self.end = function(socketList) {
    setup();
    for (var id in Player.list) {
      socketList[id].emit('endGame');
    }
  }

  setup();
  return self;
}

module.exports = Game;
