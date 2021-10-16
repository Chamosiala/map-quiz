import { Text, Box } from '@chakra-ui/layout';

const CompletionPercentage = ({ remainingAnswers, correctAnswers }) => {
  return (
    <Box w="75px" backgroundColor="green">
      <Text
        align="center"
        h="85px"
        fontSize="large"
        margin="auto"
        lineHeight="85px"
      >
        {Math.floor(
          (100 * correctAnswers) / (remainingAnswers + correctAnswers)
        )}
        %
      </Text>
    </Box>
  );
};

export default CompletionPercentage;
