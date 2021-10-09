import { Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';

const Timer = ({ timerOn = false, loseGame, onTimePause }) => {
  const maxTime = 480000;
  const [time, setTime] = useState(maxTime);

  useEffect(() => {
    let interval = null;
    let timeout = null;

    if (timerOn) {
      setTime(maxTime);
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 10);
      }, 10);
      timeout = setTimeout(() => {
        clearInterval(interval);
        setTime(0);
        loseGame();
      }, maxTime);
    } else {
      clearInterval(interval);
      onTimePause(time);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [timerOn]);

  return (
    <Text my="auto" fontSize="x-large" align="center">
      {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
      {('0' + Math.floor((time / 1000) % 60)).slice(-2)}.
      {('0' + ((time / 10) % 100)).slice(-2)}
    </Text>
  );
};

export default Timer;
