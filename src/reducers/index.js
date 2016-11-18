import {combineReducers} from 'redux';
import field from './fieldReducer';
import settings from './settingsReducer';
import players from './playersReducer';

const rootReducer = combineReducers({
  field,
  settings,
  players
});

export default rootReducer;
