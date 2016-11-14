import * as types from './actionTypes';
import FieldApi from '../api/mockFieldApi';

export function drawCardSuccess(data) {
  return {type: types.DRAW_CARD_SUCCESS, data};
}

export function viewCard(card) {
  return {type: types.VIEW_CARD, card};
}

export function closeCardSuccess() {
  return {type: types.CLOSE_CARD};
}

export function drawCard(player) {
  return dispatch => {
    return FieldApi.drawCard(player).then(data => {
      dispatch(drawCardSuccess(data));
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
