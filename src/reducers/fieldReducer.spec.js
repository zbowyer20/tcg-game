import {expect} from 'chai';
import fieldReducer from './fieldReducer';
import * as actions from '../actions/fieldActions';
import * as gameActions from '../actions/gameActions';

describe('Field Reducer', () => {
  const exampleCard = {"id": "1-001", "name": "Zak", "element": "Fire", "cost": "6", "type": "forward", "src": "http://www.examplesrc.com/example.jpg"};
  const exampleCard2 = {"id": "1-002", "name": "Grace", "element": "Ice", "cost": "2", "type": "backup", "src": "http://www.examplesrc.com/example2.jpg"};

  const initialState = {
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
  };

  it('should set up the field information when passed START_GAME', () => {
    const updatedPlayer = Object.assign({}, initialState.PLAYER_TWO, {
      damage: [],
      forward: [],
      backup: [],
      deck: 50,
      break: []
    });

    const updatedState = Object.assign({}, initialState, {PLAYER_TWO: updatedPlayer});
    const data = {
      game: {
        field: updatedState
      }
    };

    const action = gameActions.startGame(data);

    const newState = fieldReducer(initialState, action);

    expect(newState.PLAYER_TWO.deck).to.equal(50);
    expect(newState.PLAYER_ONE.deck).to.equal(0);
  });

  it('should update the field information when passed UPDATE_FIELD', () => {
    const updatedPlayerOne = Object.assign({}, initialState.PLAYER_TWO, {
      damage: [],
      forward: [exampleCard],
      backup: [],
      deck: 49,
      break: []
    });

    const updatedPlayerTwo = Object.assign({}, initialState.PLAYER_TWO, {
      damage: [],
      forward: [],
      backup: [],
      deck: 48,
      break: [exampleCard2]
    });

    const data = Object.assign({}, initialState, {
      PLAYER_ONE: updatedPlayerOne,
      PLAYER_TWO: updatedPlayerTwo
    });

    const action = gameActions.updateField(data);

    const newState = fieldReducer(initialState, action);

    expect(newState.PLAYER_ONE.deck).to.equal(49);
    expect(newState.PLAYER_ONE.forward).to.have.lengthOf(1);
    expect(newState.PLAYER_ONE.backup).to.have.lengthOf(0);
    expect(newState.PLAYER_ONE.break).to.have.lengthOf(0);
    expect(newState.PLAYER_TWO.deck).to.equal(48);
    expect(newState.PLAYER_TWO.forward).to.have.lengthOf(0);
    expect(newState.PLAYER_TWO.break).to.have.lengthOf(1);
    expect(newState.PLAYER_TWO.break[0].id).to.equal("1-002");
  });

});
