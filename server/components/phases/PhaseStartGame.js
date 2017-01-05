'use strict;'

var Moves = require('./Moves');

function PhaseStartGame(players) {
  let self = {
    players: players,
    type: "PHASE_START_GAME",
    splash: true,
    skippable: false,
    available: true
  }

  function reset() {
    self.moves.index = 0;
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
        fn: Moves.doEventForPlayers,
        params: {
          number: 1,
          fn: Moves.drawCards,
          players: self.players
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
    if (self.moves.index + 1 > self.moves.events.length) {
      self.available = false;
    }
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

module.exports = PhaseStartGame;
