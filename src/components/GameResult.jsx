import { Text } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';

const GameResult = () => {
  const gameResults = useSelector(state => state.gameResults);
  const time = gameResults.spentTime;
  const level = gameResults.level;

  let resultText;
  if (gameResults.gameMode === 'nivele') {
    resultText = `Ai terminat nivelul ${level}!`;
  } else if (gameResults.gameMode === 'ordine') {
    resultText = 'Ai ghicit localitatile in ordine!';
  }

  if (gameResults.isWon) {
    return (
      <Text mt="100px" mx="100px" mb="5px">
        {resultText} Timpul tau:{' '}
        {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        {('0' + Math.floor((time / 1000) % 60)).slice(-2)}.
        {('0' + ((time / 10) % 100)).slice(-2)}
      </Text>
    );
  } else {
    return (
      <Text mt="100px" mx="100px" mb="5px">
        Ai pierdut nivelul {level}!
      </Text>
    );
  }
};

export default GameResult;
