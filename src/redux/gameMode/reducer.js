const gameModeReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_GAME_MODE':
      return action.payload;
    default:
      return state;
  }
};

export default gameModeReducer;
