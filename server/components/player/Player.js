'use strict';
var shortid = require('shortid');

function Player(id) {
  var self = {
    id: id,
    hand: [],
    cp: {
      amount: 0,
      elements: []
    }
  }

  self.addCard = function(card) {
    self.hand.push(card);
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
