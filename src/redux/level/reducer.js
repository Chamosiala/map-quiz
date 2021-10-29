const levelReducer = (state = '0', action) => {
  switch (action.type) {
    case 'SET_LEVEL':
      return action.payload;
    case 'INCREMENT_LEVEL':
      return (parseInt(state) + 1).toString();
    default:
      return state;
  }
};

export default levelReducer;
