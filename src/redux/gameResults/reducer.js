const INITIAL_STATE = {
  spentTime: 0,
  level: 0,
  isWon: false,
  isFinished: false,
};

const gameResultsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_GAME_RESULTS':
      return action.payload;
    case 'RESET_GAME_RESULTS':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default gameResultsReducer;
