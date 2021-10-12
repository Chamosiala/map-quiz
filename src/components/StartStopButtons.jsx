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
      backgroundColor="red"
      mt="150px"
      mx="100px"
      onClick={() => {
        setTimerOn(false);
        resetGame();
      }}
    >
      Quit
    </Button>
  ) : (
    <Button
      backgroundColor="green"
      mt="150px"
      mx="100px"
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
