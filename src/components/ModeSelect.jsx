import { Select } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setGameMode } from '../redux/gameMode/actions';

const ModeSelect = () => {
  const dispatch = useDispatch();
  const change = event => {
    dispatch(setGameMode(event.target.value));
  };

  return (
    <Select mt="10" onChange={change} placeholder="Alege modul">
      <option value="nivele">Nivele</option>
      <option value="ordine">Ordine</option>
    </Select>
  );
};

export default ModeSelect;
