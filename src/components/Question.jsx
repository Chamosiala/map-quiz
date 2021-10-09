import { Heading } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';

const Question = ({ localitati, handleChange, timerOn }) => {
  const randomIndex = Math.floor(Math.random() * localitati.length);
  const [localitate, setLocalitate] = useState(localitati[randomIndex]);

  useEffect(() => {
    setLocalitate(localitati[randomIndex]);
  }, [localitati, timerOn]);

  return (
    <Heading
      p={5}
      textColor="black"
      backgroundColor="tan"
      mb="auto"
      onChange={handleChange(localitate)}
    >
      {timerOn ? localitate : 'Olt'}
    </Heading>
  );
};

export default Question;
