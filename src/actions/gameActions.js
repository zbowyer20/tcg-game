import * as types from './actionTypes';
import GameApi from '../api/mockGameApi';

export function loadGameSuccess(game) {
  return {type: types.LOAD_GAME_SUCCESS, game};
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
