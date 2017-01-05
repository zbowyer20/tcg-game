'use strict';

var Moves = require('./Moves');

function PhaseDraw(players) {
  let self = {
    players: players,
    type: "PHASE_DRAW",
    splash: true,
    skippable: false,
    available: true
  }

  function reset() {
    self.moves.index = 0;
  }

  self.pack = function() {
    let ids = self.players.map(player => {
      return player.id
    });
    return {
      players: ids,
      type: self.type,
      splash: self.splash,
      skippable: self.skippable
    };
  }

  self.setPlayers = function(players) {
    reset();
    self.players = players;
  }

  self.isSkippable = function() {
    return self.skippable;
  }

  self.onStart = function() {
    // change this to return a function
    return {
      optional: false,
      events: [{
        fn: Moves.draw,
        params: {
          player: self.players.active,
        }
      }]
    };
  }

  self.moves = {
    events: [
      self.onStart()
    ],
    index: 0
  }

  self.nextMove = function() {
    return self.moves.events[self.moves.index++];
  }

  self.getPack = function() {
    return {
      playerIds: Object.keys(self.players),
      type: self.type,
      splash: self.type,
      skippable: self.skippable
    }
  }

  return self;
}

module.exports = PhaseDraw;
