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
      cp: {
        amount: 0,
        elements: []
      },
      hand: [],
    },
    "PLAYER_TWO": {
      id: "PLAYER_TWO",
      cp: {
        amount: 0,
        elements: []
      },
      hand: [],
    }
  },
  settings: {
    viewingCard: null,
    me: "PLAYER_ONE",
    opponent: "PLAYER_TWO",
    phase: {
      player: null,
      type: null,
      splash: false
    }
  }
};
