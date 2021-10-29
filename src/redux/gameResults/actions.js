export const setGameResults = gameResults => {
  return {
    type: 'SET_GAME_RESULTS',
    payload: gameResults,
  };
};

export const resetGameResults = () => {
  return {
    type: 'RESET_GAME_RESULTS',
  };
};
