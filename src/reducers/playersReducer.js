import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function playersReducer(state = initialState.players, action) {
  switch(action.type) {
    case types.START_GAME: {
      let me = Object.assign({}, state.PLAYER_ONE, {
        id: action.data.game.settings.me
      });
      let opponent = Object.assign({}, state.PLAYER_TWO, {
        id: action.data.game.settings.opponent
      });
      return Object.assign({}, {
        [action.data.game.settings.me]: me,
        [action.data.game.settings.opponent]: opponent
      });
    }
    case types.END_GAME: {
      return initialState.players;
    }
    case types.UPDATE_OPPONENT: {
      let opponent = Object.assign({}, state[action.data.id], {
        hand: action.data.hand,
        cp: action.data.cp
      });
      return Object.assign({}, state, {
        [opponent.id]: opponent
      });
    }
    case types.DRAW_CARD_SUCCESS: {
      let player = Object.assign({}, state[action.data.player], {
        hand: [...state[action.data.player].hand, action.data.card]
      });
      return Object.assign({}, state, {
        [player.id]: player
      });
    }
    case types.REMOVE_CARD_FROM_HAND: {
      let hand = state[action.move.player].hand.filter(card => {
        return card.id !== action.move.card.id
      });
      let player = Object.assign({}, state[action.move.player], {
        hand: hand
      });
      return Object.assign({}, state, {
        [player.id]: player
      });
    }
    case types.SET_CP: {
      let player = Object.assign({}, state[action.move.player], {
        cp: action.move.cp
      });
      return Object.assign({}, state, {
        [player.id]: player
      });
    }
    default:
      return state;
  }
}
