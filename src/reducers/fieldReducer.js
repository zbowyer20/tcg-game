import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fieldReducer(state = initialState.field[0], action) {
  switch(action.type) {
    case types.LOAD_GAME_SUCCESS: {
      return action.game.field[0];
    }
    case types.PLAY_CARD: {
      if (action.move.to == 'forward') {
        return Object.assign({}, state, {
          forward: [...state.forward, action.move.card]
        });
      }
      else if (action.move.to == 'backup') {
        return Object.assign({}, state, {
          backup: [...state.backup, action.move.card]
        });
      }
      return state;
    }
    case types.ACTIVATE_CARD: {
      let activatedCard = Object.assign({}, action.move.card, {
        position: 'Dull'
      });
      if (action.move.card.type == 'Forward') {
        return Object.assign({}, state, {
            forward: state.forward.map(function(card) {
              return card.id == activatedCard.id ? activatedCard : card;
            })
        });
      }
      else if (action.move.card.type == 'Backup') {
        return Object.assign({}, state, {
            backup: state.backup.map(function(card) {
              return card.id == activatedCard.id ? activatedCard : card;
            })
        });
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
