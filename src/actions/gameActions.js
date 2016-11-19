import * as types from './actionTypes';
import GameApi from '../api/mockGameApi';

export function loadGameSuccess(game) {
  return {type: types.LOAD_GAME_SUCCESS, game};
}

export function startGame(data) {
  return {type: types.START_GAME, data};
}

export function updateOpponent(data) {
  return {type: types.UPDATE_OPPONENT, data};
}

export function endGame() {
  return {type: types.END_GAME};
}

export function loadGame() {
  // return dispatch => {
  //   return GameApi.getGame().then(game => {
  //     dispatch(loadGameSuccess(game));
  //   }).catch(error => {
  //     throw(error);
  //   });
  // };
  return dispatch => {
    fetch('http://localhost:3535/api/game').then(response => {
        return response.json();
      }).then((json) => {
        dispatch(loadGameSuccess(json));
      });
  };
}
