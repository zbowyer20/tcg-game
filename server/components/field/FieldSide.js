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

  return self;
}

module.exports = FieldSide;
