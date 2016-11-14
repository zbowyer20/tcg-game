import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function gameReducer(state = initialState.players[0].hand, action) {
  switch(action.type) {
    case types.LOAD_GAME_SUCCESS:
      return action.game.players[0].hand;
    case types.DRAW_CARD_SUCCESS:
      return [...state, action.card];
    case types.REMOVE_CARD_FROM_HAND:
      return [...state.filter(card => card.id !== action.move.card.id)];
    default:
      return state;
  }
}
