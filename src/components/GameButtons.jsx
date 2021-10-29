import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { incrementLevel } from '../redux/level/actions';
import { setTimerOn } from '../redux/timer/actions';
import StartStopButtons from './StartStopButtons';

const GameButtons = ({ resetGame }) => {
  const gameResults = useSelector(state => state.gameResults);
  const level = useSelector(state => state.level);
  const dispatch = useDispatch();

  return (
    <Flex className="gameButtons" mt="10">
      <StartStopButtons resetGame={resetGame} level={level} />
      {gameResults.isWon && level !== '14' ? (
        <Button
          backgroundColor="green"
          onClick={() => {
            dispatch(incrementLevel());
            dispatch(setTimerOn(true));
            resetGame();
          }}
        >
          Nivelul Urmator
        </Button>
      ) : null}
    </Flex>
  );
};

export default GameButtons;
