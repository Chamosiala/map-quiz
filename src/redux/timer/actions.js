export const setTimerOn = isOn => {
  return {
    type: 'SET_TIMER_ON',
    payload: isOn,
  };
};

export const resetTimer = () => {
  return {
    type: 'RESET_TIMER',
  };
};

export const setTime = time => {
  return {
    type: 'SET_TIME',
    payload: time,
  };
};

export const decreaseTime = interval => {
  return {
    type: 'DECREASE_TIME',
    payload: interval,
  };
};
