export const resetLocalitati = () => {
  return {
    type: 'RESET_LOCALITATI',
  };
};

export const removeLocalitate = localitate => {
  return {
    type: 'REMOVE_LOCALITATE',
    payload: localitate,
  };
};

export const setLocalitatiByLevel = level => {
  return {
    type: 'SET_LOCALITATI_BY_LEVEL',
    payload: level,
  };
};
