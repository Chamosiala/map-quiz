import { Select } from '@chakra-ui/react';

const LevelSelect = ({ setLevel }) => {
  const change = event => {
    setLevel(event.target.value);
  };

  return (
    <Select onChange={change} placeholder="Alege nivelul">
      <option value="1">Nivelul 1</option>
      <option value="2">Nivelul 2</option>
      <option value="3">Nivelul 3</option>
      <option value="4">Nivelul 4</option>
      <option value="5">Nivelul 5</option>
      <option value="6">Nivelul 6</option>
      <option value="7">Nivelul 7</option>
      <option value="8">Nivelul 8</option>
      <option value="9">Nivelul 9</option>
      <option value="10">Nivelul 10</option>
    </Select>
  );
};

export default LevelSelect;
