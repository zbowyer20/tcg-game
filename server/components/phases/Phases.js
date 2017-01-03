var PhaseStartGame = require('./PhaseStartGame');
var PhaseDraw = require('./PhaseDraw');
var Sockets = require('../../Socket');

function Phases(players) {
  let self = {
    phases: [],
    i: 0,
    players: {
      active: null,
      inactive: null
    }
  };

  function init(starterId, players) {
    self.phases.push(new PhaseStartGame(players));
    self.phases.push(new PhaseDraw(players[starterId]))
  }

  self.setActivePlayer = function() {
    let temp = players.active;
    players.active = players.inactive;
    players.inactive = temp;
  }

  self.start = function(starterId, players) {
    //self.phases[self.i].setPlayer(starterId);
    let inactiveId = Object.keys(players).filter(id => {
      return id != starterId
    });
    self.players = {
      active: players[starterId],
      inactive: players[inactiveId]
    }

    init(starterId, players);
    return self.phases[self.i];
  }

  self.current = function() {
    return self.phases[self.i];
  }

  function nextRound() {
    self.setActivePlayer();
  }

  self.next = function() {
    self.i++;
    if (self.i === self.phases.length) {
      nextRound();
    }
    self.current().setPlayer
    return self.current();
  }

  self.nextMove = function() {
    return new Promise((resolve) => {
      let next = self.current().nextMove();
      if (next) {
        return resolve(next);
      } else {
        setTimeout(function() {
          next = self.next().nextMove();
          Sockets.send.phase({
            phase: self.current().getPack(),
            to: {
              [self.players.active.id]: self.players.active,
              [self.players.inactive.id]: self.players.inactive
            }
          });
          return resolve(next);
        }, 2500)
      }
    })
  }

  function executeEvent(event, field) {
    event.params.field = field;
    event.params.players = [self.players.active, self.players.inactive];
    event.fn.bind(null, event.params)();
  }

  self.execute = function(field) {
    return new Promise((resolve) => {
      self.nextMove().then(segment => {
        if (!segment.optional) {
          for (var i = 0; i < segment.events.length; i++) {
            executeEvent(segment.events[i], field);
          }
        }
        return resolve();
      });
    });
  }

  return self;
}

module.exports = Phases;
