import LOCALITATI_OLT from '../../constants/LOCALITATI_OLT';

const localitatiReducer = (
  state = { localitati: LOCALITATI_OLT, isFiltered: false },
  action
) => {
  switch (action.type) {
    case 'RESET_LOCALITATI':
      return { localitati: LOCALITATI_OLT, isFiltered: false };
    case 'REMOVE_LOCALITATE':
      return {
        ...state,
        localitati: state.localitati.filter(
          localitate => localitate !== action.payload
        ),
      };
    case 'SET_LOCALITATI_BY_LEVEL':
      if (action.payload === 0) {
        return {
          localitati: LOCALITATI_OLT.slice(0, 2),
          isFiltered: true,
        };
      } else {
        return {
          localitati: LOCALITATI_OLT.slice(0, 8 * action.payload),
          isFiltered: true,
        };
      }
    default:
      return state;
  }
};

export default localitatiReducer;
