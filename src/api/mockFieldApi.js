import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const field = {
  damage: [],
  forward: [],
  backup: [],
  deck: 50,
  break: []
};

const deck = [
  {"id": "1-001", "name": "Auron", "element": "Fire", "cost": "3", "type": "Forward", "src": "http://www.bigorbitcards.co.uk/images/thumbnails/280/400/detailed/494/auron-1_sjpw-07.jpg"},
  {"id": "1-028", "name": "Reynn", "element": "Fire", "cost": "2", "type": "Forward", "src": "http://www.bigorbitcards.co.uk/images/thumbnails/280/400/detailed/494/reynn-28_zndo-n9.jpg"},
  {"id": "1-049", "name": "Time Mage", "element": "Light", "cost": "1", "type": "Backup", "src": "http://www.bigorbitcards.co.uk/images/thumbnails/280/400/detailed/494/time-mage-49_8qom-6x.jpg"}
];

//This would be performed on the server in a real app. Just stubbing in.
//const generateId = (author) => {
//  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
//};

class FieldApi {
  static getField() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, field));
      }, delay);
    });
  }

  static drawCard() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let index = Math.floor(Math.random() * deck.length);
        resolve(Object.assign({}, deck[index]));
      }, delay);
    });
  }
}

export default FieldApi;
