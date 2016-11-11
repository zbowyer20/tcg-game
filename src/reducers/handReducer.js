import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function gameReducer(state = initialState.hand, action) {
  switch(action.type) {
    case types.LOAD_HAND_SUCCESS:
      return action.hand;
    case types.DRAW_CARD_SUCCESS:
      return [...state, action.card];
    case types.REMOVE_CARD_FROM_HAND:
      return [...state.filter(card => card.id !== action.move.card.id)];
    default:
      return state;
  }
}
