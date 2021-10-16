import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import StartStopButtons from './StartStopButtons';

const GameButtons = ({
  timerOn,
  setTimerOn,
  resetGame,
  gameIsLost,
  gameIsWon,
  level,
  setLevel,
}) => {
  return (
    <Flex className="gameButtons" mt="10">
      <StartStopButtons
        timerOn={timerOn}
        setTimerOn={setTimerOn}
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
            setTimerOn(true);
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
