import { Text, Box } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';

const CompletionPercentage = () => {
  const gameStats = useSelector(state => state.gameStats);

  return (
    <Box w="75px" backgroundColor="green">
      <Text
        align="center"
        h="85px"
        fontSize="4xl"
        margin="auto"
        lineHeight="85px"
      >
        {/* {Math.floor(
          (100 * gameStats.correctAnswers) /
            (gameStats.remainingAnswers + gameStats.correctAnswers)
        )} */}
        {gameStats.correctAnswers}
      </Text>
    </Box>
  );
};

export default CompletionPercentage;
