import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function gameReducer(state = initialState.game, action) {
  switch(action.type) {
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
