export const setLevel = level => {
  return {
    type: 'SET_LEVEL',
    payload: level,
  };
};

export const incrementLevel = () => {
  return {
    type: 'INCREMENT_LEVEL',
  };
};
