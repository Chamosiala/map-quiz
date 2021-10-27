import { Text } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';

const GameResult = ({ result, level }) => {
  const time = useSelector(state => state.timer.spentTime);

  if (result === 'won') {
    return (
      <Text mt="100px" mx="100px" mb="5px">
        Ai terminat nivelul {level}! Timpul tau:{' '}
        {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        {('0' + Math.floor((time / 1000) % 60)).slice(-2)}.
        {('0' + ((time / 10) % 100)).slice(-2)}
      </Text>
    );
  } else if (result === 'lost') {
    return (
      <Text mt="100px" mx="100px" mb="5px">
        Ai pierdut!
      </Text>
    );
  }
};

export default GameResult;
