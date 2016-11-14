import {combineReducers} from 'redux';
import field from './fieldReducer';
import game from './gameReducer';
import players from './playersReducer';

const rootReducer = combineReducers({
  field,
  game,
  players
});

export default rootReducer;
