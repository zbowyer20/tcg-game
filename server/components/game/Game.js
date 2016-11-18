'use strict';

var Field = require('../field/Field');
var Player = require('../player/Player');

function Game() {
  var self = {
    field: Field(),
    players: Player.list,
    settings: {
      me: "PLAYER_ONE",
      opponent: "PLAYER_TWO"
    }
  }

  self.addPlayer = function(id) {
    Player.list[id] = Player(id);
    self.field.addPlayer(id);
  }

  self.removePlayer = function(id) {
    delete Player.list[id];
  }

  self.draw = function(id) {
    let card = self.field.draw(id);
    Player.list[id].addCard(card);
    return card;
  }

  function ready() {
    return Object.keys(self.players).length == 2;
  }

  self.initialize = function(socketList) {
    if (ready()) {
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

  return self;
}

module.exports = Game;
