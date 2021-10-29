export const setRemainingAnswers = number => {
  return {
    type: 'SET_REMAINING_ANSWERS',
    payload: number,
  };
};

export const setCorrectAnswers = number => {
  return {
    type: 'SET_CORRECT_ANSWERS',
    payload: number,
  };
};

export const setWrongAnswers = number => {
  return {
    type: 'SET_WRONG_ANSWERS',
    payload: number,
  };
};

export const incrementCorrectAnswers = () => {
  return {
    type: 'INCREMENT_CORRECT_ANSWERS',
  };
};

export const incrementWrongAnswers = () => {
  return {
    type: 'INCREMENT_WRONG_ANSWERS',
  };
};

export const decrementRemainingAnswers = () => {
  return {
    type: 'DECREMENT_REMAINING_ANSWERS',
  };
};
