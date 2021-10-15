import { Button } from '@chakra-ui/button';

const StartStopButtons = ({
  timerOn,
  setTimerOn,
  resetGame,
  gameIsLost,
  gameIsWon,
  level,
}) => {
  return timerOn ? (
    <Button
      mx="auto"
      backgroundColor="red"
      onClick={() => {
        setTimerOn(false);
        resetGame();
      }}
    >
      Quit
    </Button>
  ) : (
    <Button
      mx="auto"
      backgroundColor="green"
      onClick={() => {
        if (level !== '0' && level !== '') {
          setTimerOn(true);
          resetGame();
        }
      }}
    >
      {gameIsLost || gameIsWon ? 'Play Again' : 'Play'}
    </Button>
  );
};

export default StartStopButtons;
