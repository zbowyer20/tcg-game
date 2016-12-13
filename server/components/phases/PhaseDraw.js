var Moves = require('./Moves');

function PhaseDraw(player) {
  let self = {
    players: [player],
    type: "PHASE_DRAW",
    splash: true,
    skippable: false
  }

  function reset() {
    self.moves.index = 0;
  }

  self.setPlayers = function(player) {
    reset();
    self.players = [player];
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
          player: player
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
    console.log("Drawing");
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
