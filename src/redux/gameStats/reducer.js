const gameStatsReducer = (
  state = { remainingAnswers: 0, correctAnswers: 0, wrongAnswers: 0 },
  action
) => {
  switch (action.type) {
    case 'SET_REMAINING_ANSWERS':
      return { ...state, remainingAnswers: action.payload };
    case 'SET_CORRECT_ANSWERS':
      return { ...state, correctAnswers: action.payload };
    case 'SET_WRONG_ANSWERS':
      return { ...state, wrongAnswers: action.payload };
    case 'INCREMENT_CORRECT_ANSWERS':
      return { ...state, correctAnswers: state.correctAnswers + 1 };
    case 'INCREMENT_WRONG_ANSWERS':
      return { ...state, wrongAnswers: state.wrongAnswers + 1 };
    case 'DECREMENT_REMAINING_ANSWERS':
      return { ...state, remainingAnswers: state.remaningAnswers - 1 };
    default:
      return state;
  }
};

export default gameStatsReducer;
