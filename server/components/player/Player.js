'use strict';
var shortid = require('shortid');

function Player(id) {
  var self = {
    id: id,
    hand: [],
  }

  self.cp = {
    amount: 0,
    elements: [],

    reset: function() {
      self.cp.amount = 0;
      self.cp.elements = [];
    },

    update: function(amount, element) {
      self.cp.amount += amount;
      self.cp.elements.push(element);
      self.cp.elements = getUniqueArray(self.cp.elements);
      return self.cp;
    },

    /**
    * Get the data relating to the player's CP
    * @returns {Object} the amount and elements of the player's CP
    */
    pack: function() {
      return {
        amount: self.cp.amount,
        elements: self.cp.elements
      };
    }
  }

  self.hand = {
    cards: [],

    add: function(card) {
      self.hand.cards.push(card);
    },

    remove: function(cid) {
      let discarded = self.hand.card(cid);
      self.hand.cards = self.hand.cards.filter(card => {
        return card.id != cid;
      });
      return discarded;
    },

    get: function() {
      return self.hand.cards;
    },

    /**
    * Get the player's publically visible hand
    * @returns {Array} The publically visible hand.
                       Currently an array of ids, one per card in the hand
    */
    getPublic: function() {
      return self.hand.get().map(card => {
        return {id: shortid.generate()}
      });
    },

    /**
    * Get the card from the player's hand with the given id
    * @param cid {String} The id of the card to return
    * @returns {Card} The card with this id, or undefined if the player does not
                      have this card
    */
    card: function(cid) {
      return self.hand.cards.find(card => {
        return card.id == cid;
      });
    }
  }

  /**
  * Play a card from the player's hand to the field
  * @param cid {String} The id of the card to play
  * @returns {Card} The played card
  */
  self.play = function(cid) {
    let card = self.hand.card(cid);
    card.setPosition(card.type == "forward" ? "active" : "dull");
    self.hand.remove(cid);
    return card;
  }

  /**
  * Filter all duplicate objects out of an array
  * @param arr {Array} The array to filter
  * @returns {Array} The filtered array
  */
  function getUniqueArray(arr) {
    return arr.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    });
  }

  /**
  * Get the player's publically visible information
  * @returns {Object} currently containing the player's id, visible hand and cp.
  */
  self.getPublicPack = function() {
    return {
      id: self.id,
      hand: self.hand.getPublic(),
      cp: self.cp.pack()
    };
  }

  /**
  * Get the player's full data
  * @returns {Object} currently containing the player's id, hand and cp.
  */
  self.getPack = function() {
    return {
      id: self.id,
      hand: self.hand.get(),
      cp: self.cp.pack()
    };
  }

  return self;
}

/**
* Return public player data available to a given player
* @param pid {String} The id of the player data will be returned to
* @returns {Object} containing the player information and the public data
                    of his opponent
*/
Player.buildPack = function(pid) {
  return {
    me: pid,
    opponent: Object.keys(Player.list).find((id) => {
      // the player whose ID is not mine is my opponent
      return id != pid
    })
  };
}

Player.list = {};

module.exports = Player;
