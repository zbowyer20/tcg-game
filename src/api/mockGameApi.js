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
        if (card.type == 'Forward') {
          resolve (Object.assign({}, {
            'card': card,
            'to': 'forward'
          }));
        }
        else {
          resolve (Object.assign({}, {
            'card': card,
            'to': 'backup'
          }));
        }
      }, delay);
    });
  }
}

export default GameApi;
