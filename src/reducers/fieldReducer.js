import * as types from '../actions/actionTypes';
import * as terms from '../constants/gameConstants';
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
      let field = Object.assign({}, state.PLAYER_ONE, {
        [action.move.to]: [...state.PLAYER_ONE[action.move.to], action.move.card]
      });
      return Object.assign({}, state, {
        PLAYER_ONE: field
      });
    }
    case types.ACTIVATE_CARD: {
      let activatedCard = Object.assign({}, action.move.card, {
        position: terms.DULL_STATE
      });
      let playerCards = Object.assign({}, state.PLAYER_ONE, {
        [action.move.card.type]:
          state.PLAYER_ONE[action.move.card.type].map(function(card) {
            return card.id == activatedCard.id ? activatedCard : card;
          })
      });
      return Object.assign({}, state, {
        PLAYER_ONE: playerCards
      });
    }
    case types.DISCARD_CARD: {
      let cards = Object.assign({}, state[action.move.player], {
        break: [...state[action.move.player].break, action.move.data.card]
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
