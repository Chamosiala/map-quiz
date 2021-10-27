import { Button } from '@chakra-ui/button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setTimerOn } from '../redux/timer/actions';

const StartStopButtons = ({ resetGame, gameIsLost, gameIsWon, level }) => {
  const timer = useSelector(state => state.timer);
  const dispatch = useDispatch();

  return timer.isOn ? (
    <Button
      mx="auto"
      backgroundColor="red"
      onClick={() => {
        dispatch(setTimerOn(false));
        resetGame();
      }}
    >
      Stop
    </Button>
  ) : (
    <Button
      mx="auto"
      backgroundColor="green"
      onClick={() => {
        if (level !== '0' && level !== '') {
          dispatch(setTimerOn(true));
          resetGame();
        }
      }}
    >
      {gameIsLost || gameIsWon ? 'Play Again' : 'Play'}
    </Button>
  );
};

export default StartStopButtons;
