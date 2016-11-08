import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fieldReducer(state = initialState.field, action) {
  switch(action.type) {
    case types.LOAD_FIELD_SUCCESS:
      return action.field;
    default:
      return state;
  }
}
