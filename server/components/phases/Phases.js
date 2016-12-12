var PhaseStartGame = require('./PhaseStartGame');

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
    return self.current().nextMove();
  }

  function executeEvent(event, field) {
    event.params.field = field;
    event.params.players = [self.players.active, self.players.inactive];
    event.fn.bind(null, event.params)();
  }

  self.execute = function(field) {
    let segment = self.current().nextMove();
    if (segment) {
      if (!segment.optional) {
        for (var i = 0; i < segment.events.length; i++) {
          executeEvent(segment.events[i], field);
        }
      }
    }
  }

  return self;
}

module.exports = Phases;
