const questionReducer = (state = 'Olt', action) => {
  switch (action.type) {
    case 'SET_QUESTION':
      return action.payload ? action.payload : null;
    default:
      return state;
  }
};

export default questionReducer;
