export default {
  field: {
    "PLAYER_ONE": {
      damage: [],
      forward: [],
      backup: [],
      deck: 0,
      break: []
    },
    "PLAYER_TWO": {
      damage: [],
      forward: [],
      backup: [],
      deck: 0,
      break: []
    }
  },
  players: {
    "PLAYER_ONE": {
      id: "PLAYER_ONE",
      hand: [],
      cp: {
        amount: 0,
        elements: []
      }
    },
    "PLAYER_TWO": {
      id: "PLAYER_TWO",
      hand: 0,
      cp: {
        amount: 0,
        elements: []
      }
    }
  },
  game: {
    viewingCard: null,
    me: "PLAYER_ONE"
  }
};
