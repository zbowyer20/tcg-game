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
  hand: [],
  cp: {
    amount: 0,
    elements: []
  }
};

const player2 = {
  id: "PLAYER_TWO",
  hand: [],
  cp: {
    amount: 0,
    elements: []
  }
};

const game = {
  field: {
    "PLAYER_ONE": field1,
    "PLAYER_TWO": field2
  },
  players: {
    "PLAYER_ONE": player1,
    "PLAYER_TWO": player2
  },
  me: "PLAYER_ONE",
  opponent: "PLAYER_TWO"
};

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const hand = [];

class GameApi {
  static getUniqueArray(arr) {
    return arr.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    });
  }

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
            'player': player,
            'cp': {
              amount: 0,
              elements: []
            }
          }));
        }
        else {
          resolve (Object.assign({}, {
            'card': playedCard,
            'to': terms.BACKUP,
            'player': player,
            'cp': {
              amount: 0,
              elements: []
            }
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
    let self = this;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve (Object.assign({}, {
          'card': card,
          'player': player,
          'cp': {
            amount: player.cp.amount + 2,
            elements: self.getUniqueArray([...player.cp.elements, card.element])
          }
        }));
      }, delay);
    });
  }
}

export default GameApi;
