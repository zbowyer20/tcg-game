import * as types from './actionTypes';
import GameApi from '../api/mockGameApi';

export function loadHandSuccess(hand) {
  return {type: types.LOAD_HAND_SUCCESS, hand};
}

export function loadHand() {
  return dispatch => {
    return GameApi.getHand().then(game => {
      dispatch(loadHandSuccess(game));
    }).catch(error => {
      throw(error);
    });
  };
}
