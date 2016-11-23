import * as types from './actionTypes';

export function loadGameSuccess(game) {
  return {type: types.LOAD_GAME_SUCCESS, game};
}

export function startGame(data) {
  return {type: types.START_GAME, data};
}

export function updatePlayer(data) {
  return {type: types.UPDATE_PLAYER, data};
}

export function updateField(data) {
  return {type: types.UPDATE_FIELD, data};
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
