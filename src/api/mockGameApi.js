import delay from './delay';

const field1 = {
  damage: [],
  forward: [],
  backup: [],
  deck: 50,
  break: []
};

const field2 = {
  damage: [],
  forward: [],
  backup: [],
  deck: 50,
  break: []
};

const player1 = {
  id: "PLAYER_ONE",
  hand: []
};

const player2 = {
  id: "PLAYER_TWO",
  hand: []
};

const game = {
  field: {
    "PLAYER_ONE": field1,
    "PLAYER_TWO": field2
  },
  players: {
    "PLAYER_ONE": player1,
    "PLAYER_TWO": player2
  }
};

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const hand = [];

class GameApi {
  static getGame() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, game));
      }, delay);
    });
  }

  static getHand() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...hand]);
      }, delay);
    });
  }

  static playCard(player, card) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let playedCard = Object.assign({}, card, {
          position: card.type == 'Backup' ? 'Dull' : 'Active'
        });
        if (card.type == 'forward') {
          resolve (Object.assign({}, {
            'card': playedCard,
            'to': 'forward',
            'player': player
          }));
        }
        else {
          resolve (Object.assign({}, {
            'card': playedCard,
            'to': 'backup',
            'player': player
          }));
        }
      }, delay);
    });
  }

  static activateCard(card) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve (Object.assign({}, {
          'card': card,
          'position': 'dull'
        }));
      }, delay);
    });
  }

  static discardCard(player, card) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve (Object.assign({}, {
          'card': card,
          'player': player,
          'cp': {
            'amount': 2,
          }
        }));
      }, delay);
    });
  }
}

export default GameApi;
