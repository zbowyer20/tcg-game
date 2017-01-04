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

  function findCard(zone, cid) {
    return self[zone].find(card => {
      return card.id == cid;
    });
  }

  self.dullCard = function(cid) {
    let card = findCard('forward', cid) || findCard('backup', cid);
    card.setPosition("dull");
    return card;
  }

  self.getPack = function() {
    return self;
  }

  return self;
}

module.exports = FieldSide;
