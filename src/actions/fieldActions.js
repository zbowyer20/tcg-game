import * as types from './actionTypes';
import FieldApi from '../api/mockFieldApi';

export function loadFieldSuccess(field) {
  return {type: types.LOAD_FIELD_SUCCESS, field};
}

export function loadField() {
  return dispatch => {
    return FieldApi.getField().then(field => {
      dispatch(loadFieldSuccess(field));
    }).catch(error => {
      throw(error);
    });
  };
}
