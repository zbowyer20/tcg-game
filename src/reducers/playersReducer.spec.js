import {expect} from 'chai';
import playersReducer from './playersReducer';
import * as fieldActions from '../actions/fieldActions';
import * as gameActions from '../actions/gameActions';
import * as cardActions from '../actions/cardActions';

describe('Player Reducer', () => {
  const exampleCard = {"id": "1-001", "name": "Zak", "element": "Fire", "cost": "6", "type": "forward", "src": "http://www.examplesrc.com/example.jpg"};
  const exampleCard2 = {"id": "1-002", "name": "Grace", "element": "Ice", "cost": "2", "type": "backup", "src": "http://www.examplesrc.com/example2.jpg"};
  const initialState = {
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
  };

  it('should set up the player information when passed START_GAME', () => {
    const data = {
      game: {
        settings: {
          me: 'X912132',
          opponent: 'Z128212'
        }
      }
    };

    const action = gameActions.startGame(data);

    const newState = playersReducer(initialState, action);

    expect(newState.X912132.id).to.equal('X912132');
    expect(newState.Z128212.id).to.equal('Z128212');
  });

  it('should update the player information when passed UPDATE_PLAYER', () => {
    const data = {
      id: 'PLAYER_TWO',
      hand: [exampleCard],
      cp: {
        amount: 2,
        elements: ['Fire']
      }
    };

    const action = gameActions.updatePlayer(data);

    const newState = playersReducer(initialState, action);

    expect(newState.PLAYER_TWO.id).to.equal('PLAYER_TWO');
    expect(newState.PLAYER_TWO.hand).to.have.lengthOf(1);
    expect(newState.PLAYER_TWO.cp.amount).to.equal(2);
    expect(newState.PLAYER_TWO.cp.elements[0]).to.equal('Fire');
  });

  it('should add the drawn card to the players hand', () => {
    const playerWithHand = Object.assign({}, initialState.PLAYER_ONE, {
      hand: [exampleCard]
    });
    const initialStateWithHand = Object.assign({}, initialState, {PLAYER_ONE: playerWithHand});
    const data = {
      card: exampleCard2,
      player: "PLAYER_ONE"
    };

    const action = fieldActions.drawCardSuccess(data);

    const newState = playersReducer(initialStateWithHand, action);

    expect(newState.PLAYER_ONE.hand).to.have.lengthOf(2);
    expect(newState.PLAYER_ONE.hand[1].id).to.equal("1-002");
  });

  it('should remove the given card from the players hand when REMOVE_CARD', () => {
    const playerWithHand = Object.assign({}, initialState.PLAYER_ONE, {
      hand: [exampleCard, exampleCard2]
    });
    const initialStateWithHand = Object.assign({}, initialState, {PLAYER_ONE: playerWithHand});
    const data = {
      card: exampleCard,
      player: "PLAYER_ONE"
    };

    const action = cardActions.removeCardFromHand(data);

    const newState = playersReducer(initialStateWithHand, action);

    expect(newState.PLAYER_ONE.hand).to.have.lengthOf(1);
    expect(newState.PLAYER_ONE.hand[0].id).to.equal("1-002");
  });

  it('should set the players CP when SET_CP', () => {
    const data = {
      player: "PLAYER_TWO",
      cp: {
        amount: 6,
        elements: ["Fire", "Ice", "Darkness"]
      }
    };

    const action = cardActions.setCP(data);

    const newState = playersReducer(initialState, action);

    expect(newState.PLAYER_TWO.cp.amount).to.equal(6);
    expect(newState.PLAYER_TWO.cp.elements).to.have.lengthOf(3);
    expect(newState.PLAYER_TWO.cp.elements[1]).to.equal("Ice");
  });
});
