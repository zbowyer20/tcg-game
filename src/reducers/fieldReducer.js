import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fieldReducer(state = initialState.field, action) {
  switch(action.type) {
    case types.LOAD_FIELD_SUCCESS:
      return action.field;
    case types.PLAY_CARD:
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
    default:
      return state;
  }
}
