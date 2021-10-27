import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { useDispatch } from 'react-redux';
import { setTimerOn } from '../redux/timer/actions';
import StartStopButtons from './StartStopButtons';

const GameButtons = ({ resetGame, gameIsLost, gameIsWon, level, setLevel }) => {
  const dispatch = useDispatch();

  return (
    <Flex className="gameButtons" mt="10">
      <StartStopButtons
        resetGame={resetGame}
        gameIsLost={gameIsLost}
        gameIsWon={gameIsWon}
        level={level}
      />
      {gameIsWon && level !== '14' ? (
        <Button
          backgroundColor="green"
          onClick={() => {
            setLevel(prevLevel => (parseInt(prevLevel) + 1).toString());
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
