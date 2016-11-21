var Card = require('../card/Card');

function FieldSide() {
  var self = {
    damage: [],
    forward: [],
    backup: [],
    deck: 50,
    break: [],
  }

  self.draw = function() {
    // query database here, if not preloading entire deck
    return Card.random();
    self.deck--;
  }

  self.addCard = function(card, zone) {
    self[zone].push(card);
    return self[zone];
  }

  return self;
}

module.exports = FieldSide;
