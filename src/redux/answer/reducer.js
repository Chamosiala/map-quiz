const answerReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ANSWER':
      return action.payload;
    default:
      return state;
  }
};

export default answerReducer;
