import {combineReducers} from 'redux';
import field from './fieldReducer';
import game from './gameReducer';

const rootReducer = combineReducers({
  field,
  game
});

export default rootReducer;
