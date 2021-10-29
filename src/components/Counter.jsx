import { Box, Flex, Text } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';

const Counter = () => {
  const gameStats = useSelector(state => state.gameStats);
  console.log(gameStats.remainingAnswers);

  return (
    <Flex mt="40px" mx="auto" p=".1875rem" fontSize=".9em" lineHeight={1.1}>
      <Box background="gray" p="1.4%">
        <Text>Remaining</Text>
        <Text fontSize="large">{gameStats.remainingAnswers}</Text>
      </Box>
      <Box background="gray" p="1.4%">
        <Text>Correct</Text>
        <Text fontSize="large">{gameStats.correctAnswers}</Text>
      </Box>
      <Box background="gray" p="1.4%">
        <Text>Wrong</Text>
        <Text fontSize="large">{gameStats.wrongAnswers}</Text>
      </Box>
    </Flex>
  );
};

export default Counter;
