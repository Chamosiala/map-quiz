import { Text } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { decreaseTime, resetTimer, setTime } from '../redux/timer/actions';

const Timer = ({ maxTime, loseGame }) => {
  const timer = useSelector(state => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;
    let timeout = null;

    if (timer.isOn) {
      dispatch(resetTimer());
      interval = setInterval(() => {
        dispatch(decreaseTime(10));
      }, 10);
      timeout = setTimeout(() => {
        clearInterval(interval);
        dispatch(setTime(0));
        loseGame();
      }, maxTime);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.isOn]);

  return (
    <Text my="auto" fontSize="x-large" align="center">
      {('0' + Math.floor((timer.remainingTime / 60000) % 60)).slice(-2)}:
      {('0' + Math.floor((timer.remainingTime / 1000) % 60)).slice(-2)}.
      {('0' + ((timer.remainingTime / 10) % 100)).slice(-2)}
    </Text>
  );
};

export default Timer;
