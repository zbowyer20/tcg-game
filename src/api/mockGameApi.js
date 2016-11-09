import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const game = {
  hand: []
};

class GameApi {
  static getGame() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, game));
      }, delay);
    });
  }
}

export default GameApi;
