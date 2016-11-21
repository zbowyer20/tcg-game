'use strict';
var shortid = require('shortid');

function Player(id) {
  var self = {
    id: id,
    hand: [],
  }

  self.addCard = function(card) {
    self.hand.push(card);
  }

  self.getHand = function() {
    return self.hand;
  }

  function getCardFromHand(id) {
    return self.hand.find(card => {
      return card.id == id;
    });
  }

  self.removeCard = function(id) {
    let discard = self.hand.find((card) => {
      return card.id == id;
    });
    self.hand = self.hand.filter(card => {
      return card.id != id;
    });
    return discard;
  }

  self.playCard = function(id) {
    let card = getCardFromHand(id);
    card.setPosition(card.type == "forward" ? "active" : "dull");
    self.removeCard(id);
    return card;
  }

  function getUniqueArray(arr) {
    return arr.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    });
  }

  self.resetCP = function() {
    self.cp = {
      amount: 0,
      elements: []
    };
    return self.cp;
  }

  self.updateCP = function(amount, element) {
    self.cp.amount += amount;
    self.cp.elements.push(element);
    self.cp.elements = getUniqueArray(self.cp.elements);
    return self.cp;
  }

  function getPublicHand() {
    return self.hand.map(card => {
      return {id: shortid.generate()}
    });
  }

  self.getPublicPack = function() {
    let hand = getPublicHand();
    return {
      id: self.id,
      hand: getPublicHand(),
      cp: self.cp
    };
  }

  self.cp = self.resetCP();

  return self;
}

Player.buildPack = function(id) {
  return {
    me: id,
    opponent: Object.keys(Player.list).find((playerId) => {
      // the player whose ID is not mine is my opponent
      return playerId != id
    })
  };
}

Player.list = {};

module.exports = Player;
