import delay from './delay';
import * as terms from '../constants/gameConstants';

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
          position: card.type == terms.BACKUP ? terms.DULL_STATE : terms.ACTIVE_STATE
        });
        if (card.type == terms.FORWARD) {
          resolve (Object.assign({}, {
            'card': playedCard,
            'to': terms.FORWARD,
            'player': player
          }));
        }
        else {
          resolve (Object.assign({}, {
            'card': playedCard,
            'to': terms.BACKUP,
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
          'position': terms.DULL_STATE
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
