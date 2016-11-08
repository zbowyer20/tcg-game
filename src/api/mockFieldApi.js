import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const field = {
  damage: [{"id": "id_1", "name": "Card One"}],
  forward: [{"id": "id_2", "name": "Card Two"}, {"id": "id_3", "name": "Card Three"}],
  backup: [{"id": "id_4", "name": "Card Four"}],
  deck: 50,
  break: [{"id": "id_5", "name": "Card Five"}]
};

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
}

export default FieldApi;
