var FieldSide = require('./FieldSide');

function Field() {
  var self = {};

  self.addPlayer = function(id) {
    self[id] = FieldSide();
  }

  self.draw = function(id) {
    return self[id].draw();
  }

  self.addCard = function(playerId, card, zone) {
    self[playerId].addCard(card, zone);
  }

  self.dullCard = function(playerId, cardId) {
    return self[playerId].dullCard(cardId);
  }

  return self;
}

module.exports = Field;
