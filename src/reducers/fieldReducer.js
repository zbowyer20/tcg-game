import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fieldReducer(state = initialState.field, action) {
  switch(action.type) {
    case types.START_GAME: {
      return action.data.game.field;
    }
    case types.END_GAME: {
      return initialState.field;
    }
    case types.PLAY_CARD: {
      let field = Object.assign({}, state[action.move.player], {
        [action.move.to]: [...state[action.move.player][action.move.to], action.move.card]
      });
      return Object.assign({}, state, {
        [action.move.player]: field
      });
    }
    case types.DULL_CARD: {
      let cards = Object.assign({}, state[action.move.player], {
        [action.move.card.type]:
          state[action.move.player][action.move.card.type].map(function(card) {
            return card.id == action.move.card.id ? action.move.card : card;
          })
      });
      return Object.assign({}, state, {
        [action.move.player]: cards
      });
    }
    case types.DISCARD_CARD: {
      let cards = Object.assign({}, state[action.move.player], {
        break: [...state[action.move.player].break, action.move.card]
      });
      return Object.assign({}, state, {
        [action.move.player]: cards
      });
    }
    default: {
      return state;
    }
  }
}
