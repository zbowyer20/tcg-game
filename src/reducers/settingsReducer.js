import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function gameReducer(state = initialState.settings, action) {
  switch(action.type) {
    case types.START_GAME: {
      return Object.assign({}, state, {
        me: action.data.game.settings.me,
        opponent: action.data.game.settings.opponent
      });
    }
    case types.END_GAME: {
      return initialState.settings;
    }
    case types.VIEW_CARD: {
      return Object.assign({}, state, {
        viewingCard: action.card
      });
    }
    case types.CLOSE_CARD: {
      return Object.assign({}, state, {
        viewingCard: null
      });
    }
    default:
      return state;
  }
}
