import { combineReducers } from 'redux';
import players from './players';
import team from './team';

const rootReducer = combineReducers({
  players, 
  team
});

export default rootReducer;