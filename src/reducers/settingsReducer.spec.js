import {expect} from 'chai';
import settingsReducer from './settingsReducer';
import * as actions from '../actions/fieldActions';
import * as gameActions from '../actions/gameActions';

describe('Settings Reducer', () => {
  const exampleCard = {"id": "1-001", "name": "Zak", "element": "Fire", "cost": "6", "type": "forward", "src": "http://www.examplesrc.com/example.jpg"};

  it('should set up the player information when passed START_GAME', () => {
    const initialState = {
      viewingCard: null,
      me: 'PLAYER_ONE',
      opponent: 'PLAYER_TWO'
    };

    const data = {
      game: {
        settings: {
          me: 'X912132',
          opponent: 'Z128212'
        }
      }
    };

    const action = gameActions.startGame(data);

    const newState = settingsReducer(initialState, action);

    expect(newState.me).to.equal('X912132');
    expect(newState.opponent).to.equal('Z128212');
  });

  it('should set the viewing card when passed VIEW_CARD', () => {
    const initialState = {
      viewingCard: null,
      me: 'X912132',
      opponent: 'Z128212'
    };

    const action = actions.viewCard(exampleCard);

    // act
    const newState = settingsReducer(initialState, action);

    // assert
    expect(newState.viewingCard).not.equal(null);
    expect(newState.viewingCard.id).to.equal(exampleCard.id);
    expect(newState.viewingCard.src).to.equal(exampleCard.src);
  });

  it('should close the viewing card when passed CLOSE_CARD', () => {
    const initialState = {
      viewingCard: exampleCard,
      me: 'X912132',
      opponent: 'Z128212'
    };

    const action = actions.closeCardSuccess();

    const newState = settingsReducer(initialState, action);

    expect(newState.viewingCard).to.equal(null);
  });
});
