import * as types from './actionTypes';
import GameApi from '../api/mockGameApi';
import {closeCard} from './fieldActions';

export function playCardSuccess(move) {
  return {type: types.PLAY_CARD, move};
}

export function removeCardFromHand(move) {
  return {type: types.REMOVE_CARD_FROM_HAND, move};
}

export function activateCardSuccess(move) {
  return {type: types.ACTIVATE_CARD, move};
}

export function discardCardSuccess(move) {
  return {type: types.DISCARD_CARD, move};
}

export function setCP(move) {
  return {type: types.SET_CP, move};
}

export function playCard(player, card) {
  return dispatch => {
    return GameApi.playCard(player, card).then(move => {
      dispatch(closeCard());
      dispatch(removeCardFromHand(move));
      dispatch(setCP(move));
      dispatch(playCardSuccess(move));
    }).catch(error => {
      throw(error);
    });
  };
}

export function activateCard(player, card) {
  return dispatch => {
    return GameApi.activateCard(card).then(move => {
      dispatch(closeCard());
      dispatch(activateCardSuccess(move));
    }).catch(error => {
      throw(error);
    });
  };
}

export function discardCard(player, card) {
  return dispatch => {
    return GameApi.discardCard(player, card).then(move => {
      dispatch(closeCard());
      dispatch(removeCardFromHand(move));
      dispatch(discardCardSuccess(move));
      dispatch(setCP(move));
    }).catch(error => {
      throw(error);
    });
  };
}
