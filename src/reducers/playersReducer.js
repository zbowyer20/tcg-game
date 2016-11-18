import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function playersReducer(state = initialState.players, action) {
  switch(action.type) {
    case types.START_GAME: {
      let me = Object.assign({}, state.PLAYER_ONE, {
        id: action.data.game.settings.me
      });
      let opponent = Object.assign({}, state.PLAYER_TWO, {
        id: action.data.game.settings.opponent
      });
      return Object.assign({}, {
        [action.data.game.settings.me]: me,
        [action.data.game.settings.opponent]: opponent
      });
    }
    case types.DRAW_CARD_SUCCESS: {
      let player = Object.assign({}, state[action.data.player], {
        hand: [...state[action.data.player].hand, action.data.card]
      });
      return Object.assign({}, state, {
        [player.id]: player
      });
    }
    case types.REMOVE_CARD_FROM_HAND: {
      let player = Object.assign({}, state[action.move.player.id], {
        hand: [...state[action.move.player.id].hand.filter(card => card.id !== action.move.card.id)]
      });
      return Object.assign({}, state, {
        [player.id]: player
      });
    }
    case types.SET_CP: {
      let player = Object.assign({}, state[action.move.player.id], {
        cp: {
          amount: action.move.cp.amount,
          elements: action.move.cp.elements
        }
      });
      return Object.assign({}, state, {
        [player.id]: player
      });
    }
    default:
      return state;
  }
}
