import * as types from './actionTypes';
import {closeCard} from './fieldActions';

export function playCardSuccess(move) {
  return {type: types.PLAY_CARD, move};
}

export function removeCardFromHand(move) {
  return {type: types.REMOVE_CARD_FROM_HAND, move};
}

export function dullCardSuccess(move) {
  return {type: types.DULL_CARD, move};
}

export function discardCardSuccess(move) {
  return {type: types.DISCARD_CARD, move};
}

export function setCP(move) {
  return {type: types.SET_CP, move};
}

export function playCard(player, card) {
  return dispatch => {
    let url = 'http://localhost:3535/api/field/play/' + player.id + '/' + card.id;
    fetch(url).then(response => {
      return response.json();
    }).then(json => {
      dispatch(closeCard());
      dispatch(removeCardFromHand(json));
      dispatch(setCP(json));
      dispatch(playCardSuccess(json));
    }).catch(error => {
      throw(error);
    });
  };
}

export function dullCard(player, card) {
  return dispatch => {
    let url = 'http://localhost:3535/api/field/dull/' + player.id + '/' + card.id;
    fetch(url).then(response => {
      return response.json();
    }).then(json => {
      dispatch(closeCard());
      dispatch(dullCardSuccess(json));
    }).catch(error => {
      throw(error);
    });
  };
}

export function discardCard(player, card) {
  return dispatch => {
    let url = 'http://localhost:3535/api/field/discard/' + player.id + '/' + card.id;
    fetch(url).then(response => {
      return response.json();
    }).then((json) => {
      dispatch(closeCard());
      dispatch(removeCardFromHand(json));
      dispatch(discardCardSuccess(json));
      dispatch(setCP(json));
    });
  };
}
