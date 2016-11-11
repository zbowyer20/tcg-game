import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const hand = [];

class GameApi {
  static getHand() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...hand]);
      }, delay);
    });
  }

  static playCard(card) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let playedCard = Object.assign({}, card, {
          position: card.type == 'Backup' ? 'Dull' : 'Active'
        });
        if (card.type == 'Forward') {
          resolve (Object.assign({}, {
            'card': playedCard,
            'to': 'forward'
          }));
        }
        else {
          resolve (Object.assign({}, {
            'card': playedCard,
            'to': 'backup',
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
}

export default GameApi;
