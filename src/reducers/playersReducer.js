import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function playersReducer(state = initialState.players, action) {
  switch(action.type) {
    case types.LOAD_GAME_SUCCESS: {
      return action.game.players;
    }
    case types.DRAW_CARD_SUCCESS: {
      let player = Object.assign({}, state[action.data.player.id], {
        hand: [...state[action.data.player.id].hand, action.data.card]
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
    case types.INCREMENT_CP: {
      let player = Object.assign({}, state[action.move.player.id], {
        cp: state[action.move.player.id].cp + action.move.cp.amount
      });
      return Object.assign({}, state, {
        [player.id]: player
      });
    }
    default:
      return state;
  }
}
