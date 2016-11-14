import * as types from './actionTypes';
import FieldApi from '../api/mockFieldApi';

export function drawCardSuccess(card) {
  return {type: types.DRAW_CARD_SUCCESS, card};
}

export function viewCard(card) {
  return {type: types.VIEW_CARD, card};
}

export function closeCardSuccess() {
  return {type: types.CLOSE_CARD};
}

export function drawCard() {
  return dispatch => {
    return FieldApi.drawCard().then(card => {
      dispatch(drawCardSuccess(card));
    }).catch(error => {
      throw(error);
    });
  };
}

export function closeCard() {
  return dispatch => {
    dispatch(closeCardSuccess());
  };
}
