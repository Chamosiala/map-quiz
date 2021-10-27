import { combineReducers } from 'redux';
import questionReducer from './question/reducer';
import localitatiReducer from './localitati/reducer';
import timerReducer from './timer/reducer';

const allReducers = combineReducers({
  localitati: localitatiReducer,
  timer: timerReducer,
  question: questionReducer,
});

export default allReducers;
