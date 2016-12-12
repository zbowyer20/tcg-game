'use strict';

var Field = require('../field/Field');
var Player = require('../player/Player');
var Phases = require('../phases/Phases');

function Game() {
  var self = {};
  var phases = Phases();

  function setup() {
    self.field = Field();
    self.players = Player.list,
    self.settings = {
      me: "PLAYER_ONE",
      opponent: "PLAYER_TWO"
    },
    //self.phase = {
    //  player: null,
    //  type: null
    //}
    self.phase = null;
  }

  self.addPlayer = function(id) {
    Player.list[id] = Player(id);
  }

  self.getPlayer = function(id) {
    return self.players.find(player => {
      return player.id == id;
    });
  }

  self.getPlayers = function() {
    return self.players;
  }

  self.removePlayer = function(id) {
    delete Player.list[id];
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

  function playersReady() {
    return Object.keys(self.players).filter(id => {
      return !self.players[id].ready
    }).length == 0;
  }

  self.readyPlayer = function(playerId) {
    self.players[playerId].ready = true;
    if (playersReady()) next();
  }

  function next() {
    phases.nextMove();
  }

  function start() {
    let starterId = Object.keys(self.players)[Math.floor(Math.random() * 2)];
    phases.start(starterId, self.players);
    self.phase = phases.current().getPack();
    phases.execute(self.field);
  }

  function ready() {
    return Object.keys(self.players).length == 2;
  }

  function initializeField() {
    for (var id in self.players) {
      self.field.addPlayer(id);
    }
  }

  function initializeGame() {
    // for (var id in self.players) {
    //   self.drawCards(id, 5);
    // }
    start();
  }

  self.initialize = function(socketList) {
    if (ready()) {
      initializeField();
      initializeGame();
      for (var id in Player.list) {
        let configuredGame = Object.assign({}, self, {
          settings: Player.buildPack(id)
        })
        socketList[id].emit('init', {
          game: configuredGame
        });
      }
      sendInitialData(socketList);
    }
  }

  function sendInitialData(socketList) {
    for (var id in self.getPlayers()) {
      self.emitData(socketList, {opponent: true}, id);
      self.emitData({[id]: socketList[id]}, {self: true}, id);
    }
  }

  function getData(playerId, options) {
    let data = {};
    if (options.field) {
      data.field = self.field.getPack(Player.list);
    }
    if (options.opponent) {
      data.opponent = Player.list[playerId].getPublicPack();
    }
    if (options.self) {
      data.self = Player.list[playerId].getPack();
    }
    return data;
  }

  function shouldSendData(receiverId, playerId, options) {
    let equalId = receiverId == playerId;
    let ownData = typeof(options.self) != 'undefined';
    return ownData == equalId;
  }

  function emit(socketList, playerId, data, options) {
    if (data) {
      for (var id in Player.list) {
        if (shouldSendData(id, playerId, options)) {
          socketList[id].emit('gameUpdate', data);
        }
      }
    }
  }

  self.emitData = function(socketList, options, playerId) {
    let data = getData(playerId, options);
    emit(socketList, playerId, data, options);
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
