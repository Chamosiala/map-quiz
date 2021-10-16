import { Box, Flex, Text } from '@chakra-ui/layout';

const Counter = ({ remainingAnswers, correctAnswers, wrongAnswers }) => {
  return (
    <Flex mt="40px" mx="auto" p=".1875rem" fontSize=".9em" lineHeight={1.1}>
      <Box background="gray" p="1.4%">
        <Text>Remaining</Text>
        <Text fontSize="large">{remainingAnswers}</Text>
      </Box>
      <Box background="gray" p="1.4%">
        <Text>Correct</Text>
        <Text fontSize="large">{correctAnswers}</Text>
      </Box>
      <Box background="gray" p="1.4%">
        <Text>Wrong</Text>
        <Text fontSize="large">{wrongAnswers}</Text>
      </Box>
    </Flex>
  );
};

export default Counter;
