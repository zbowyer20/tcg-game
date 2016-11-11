import {combineReducers} from 'redux';
import field from './fieldReducer';
import game from './gameReducer';
import hand from './handReducer';

const rootReducer = combineReducers({
  field,
  game,
  hand
});

export default rootReducer;
