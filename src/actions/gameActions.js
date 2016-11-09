import * as types from './actionTypes';
import GameApi from '../api/mockGameApi';

export function loadGameSuccess(game) {
  return {type: types.LOAD_GAME_SUCCESS, game};
}

export function drawCardSuccess(card) {
  return {type: types.DRAW_CARD_SUCCESS, card};
}

export function loadGame() {
  return dispatch => {
    return GameApi.getGame().then(game => {
      dispatch(loadGameSuccess(game));
    }).catch(error => {
      throw(error);
    });
  };
}

export function drawCard() {
  return dispatch => {
    return GameApi.drawCard().then(card => {
      dispatch(drawCardSuccess(card));
    }).catch(error => {
      throw(error);
    });
  };
}
