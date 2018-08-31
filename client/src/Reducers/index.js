import { combineReducers } from 'redux';
import players from './players';
import team from './team';
import picked from './picked';

const rootReducer = combineReducers({
  players, 
  team,
  picked
});

export default rootReducer;