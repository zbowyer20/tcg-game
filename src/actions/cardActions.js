import * as types from './actionTypes';
import GameApi from '../api/mockGameApi';
import {closeCard} from './fieldActions';

export function playCardSuccess(move) {
  return {type: types.PLAY_CARD, move};
}

export function removeCardFromHand(move) {
  return {type: types.REMOVE_CARD_FROM_HAND, move};
}

export function playCard(card) {
  return dispatch => {
    return GameApi.playCard(card).then(move => {
      dispatch(closeCard());
      dispatch(removeCardFromHand(move));
      dispatch(playCardSuccess(move));
    }).catch(error => {
      throw(error);
    });
  };
}
