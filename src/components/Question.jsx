import { Heading, Box } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setQuestion } from '../redux/question/actions';

const Question = () => {
  const localitatiState = useSelector(state => state.localitati);
  const localitati = localitatiState.localitati;
  const timer = useSelector(state => state.timer);
  const question = useSelector(state => state.question);
  const gameMode = useSelector(state => state.gameMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localitatiState.isFiltered && gameMode === 'nivele') {
      dispatch(
        setQuestion(localitati[Math.floor(Math.random() * localitati.length)])
      );
    } else if (gameMode === 'ordine') {
      dispatch(setQuestion(localitati[0]));
    }
  }, [localitati, timer.isOn]);

  return (
    <Box w="300px">
      <Heading
        textAlign="center"
        h="85px"
        lineHeight="85px"
        textColor="black"
        backgroundColor="tan"
        mb="auto"
      >
        {timer.isOn ? question : 'Olt'}
      </Heading>
    </Box>
  );
};

export default Question;
