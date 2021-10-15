import { Heading, Box } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';

const Question = ({ localitati, handleChange, timerOn }) => {
  const randomIndex = Math.floor(Math.random() * localitati.length);
  const [localitate, setLocalitate] = useState(localitati[randomIndex]);

  useEffect(() => {
    setLocalitate(localitati[randomIndex]);
  }, [localitati, timerOn]);

  return (
    <Box w="300px">
      <Heading
        textAlign="center"
        h="85px"
        lineHeight="85px"
        textColor="black"
        backgroundColor="tan"
        mb="auto"
        onChange={handleChange(localitate)}
      >
        {timerOn ? localitate : 'Olt'}
      </Heading>
    </Box>
  );
};

export default Question;
