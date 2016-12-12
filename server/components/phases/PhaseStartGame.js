var Moves = require('./Moves');

function PhaseStartGame(playerId) {
  let self = {
    player: playerId,
    type: "PHASE_START_GAME",
    splash: true,
    skippable: false
  }

  function reset() {
    self.moves.index = 0;
  }

  self.setPlayer = function(id) {
    reset();
    self.player = id;
  }

  self.isSkippable = function() {
    return self.skippable;
  }

  self.onStart = function() {
    // change this to return a function
    return {
      optional: false,
      events: [{
        fn: Moves.drawCards,
        params: {
          number: 5
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
      player: self.player,
      type: self.type,
      splash: self.type,
      skippable: self.skippable
    }
  }

  return self;
}

module.exports = PhaseStartGame;
