import { Text } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';

const GameResult = () => {
  // const time = useSelector(state => state.timer.spentTime);
  const gameResults = useSelector(state => state.gameResults);
  const time = gameResults.spentTime;
  const level = gameResults.level;

  if (gameResults.isWon) {
    return (
      <Text mt="100px" mx="100px" mb="5px">
        Ai terminat nivelul {level}! Timpul tau:{' '}
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
