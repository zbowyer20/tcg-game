function Player(id) {
  var self = {
    id: null,
    hand: [],
    cp: {
      amount: 0,
      elements: []
    }
  }

  self.addCard = function(card) {
    self.hand.push(card);
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
