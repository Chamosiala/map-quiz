import maxTime from './constants';

const timerReducer = (
  state = { remainingTime: maxTime, isOn: false },
  action
) => {
  switch (action.type) {
    case 'SET_TIMER_ON':
      return {
        ...state,
        spentTime: maxTime - state.remainingTime,
        isOn: action.payload,
      };
    case 'SET_TIME':
      return {
        ...state,
        remainingTime: action.payload,
        spentTime: maxTime - state.remainingTime,
      };
    case 'RESET_TIMER':
      return {
        ...state,
        remainingTime: maxTime,
        spentTime: 0,
      };
    case 'DECREASE_TIME':
      return {
        ...state,
        remainingTime: state.remainingTime - action.payload,
        spentTime: maxTime - state.remainingTime,
      };
    default:
      return { ...state, spentTime: maxTime - state.remainingTime };
  }
};

export default timerReducer;
