import { combineReducers } from 'redux';
import questionReducer from './question/reducer';
import localitatiReducer from './localitati/reducer';
import timerReducer from './timer/reducer';
import answerReducer from './answer/reducer';
import gameStatsReducer from './gameStats/reducer';
import gameResultsReducer from './gameResults/reducer';
import levelReducer from './level/reducer';
import gameModeReducer from './gameMode/reducer';

const allReducers = combineReducers({
  localitati: localitatiReducer,
  timer: timerReducer,
  question: questionReducer,
  answer: answerReducer,
  gameStats: gameStatsReducer,
  gameResults: gameResultsReducer,
  level: levelReducer,
  gameMode: gameModeReducer,
});

export default allReducers;
