var FieldSide = require('./FieldSide');

function Field() {
  var self = {};

  self.addPlayer = function(pid) {
    self[pid] = FieldSide();
  }

  self.initialize = function(players) {
    for (var pid in players) {
      self.addPlayer(pid);
    }
  }

  self.draw = function(pid) {
    return self[pid].draw();
  }

  self.addCard = function(pid, card, zone) {
    self[pid].addCard(card, zone);
  }

  self.dullCard = function(pid, cid) {
    return self[pid].dullCard(cid);
  }

  self.getPack = function(players) {
    let pack = {};
    Object.keys(players).forEach(pid => {
      pack[pid] = self[pid].getPack();
    })
    return pack;
  }

  return self;
}

module.exports = Field;
