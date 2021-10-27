import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeLocalitate,
  resetLocalitati,
  setLocalitatiByLevel,
} from './redux/localitati/actions';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import CompletionPercentage from './components/CompletionPercentage';
import Counter from './components/Counter';
import GameButtons from './components/GameButtons';
import GameResult from './components/GameResult';
import LevelSelect from './components/LevelSelect';
import Map from './components/Map';
import Question from './components/Question';
import Timer from './components/Timer';
import LOCALITATI_OLT from './constants/LOCALITATI_OLT';
import localitatiFillDictionary from './localitatiFillDictionary';
import theme from './theme';
import { setTimerOn } from './redux/timer/actions';
import { setQuestion } from './redux/question/actions';

function App() {
  const maxTime = 480000;

  const [localitatiFill, setLocalitatiFill] = useState(
    localitatiFillDictionary
  );
  const localitatiState = useSelector(state => state.localitati);
  const localitati = localitatiState.localitati;
  const timer = useSelector(state => state.timer);
  const question = useSelector(state => state.question);
  const [answer, setAnswer] = useState('');
  const [remainingAnswers, setRemainingAnswers] = useState(localitati.length);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [gameIsLost, setGameIsLost] = useState(false);
  const [gameIsWon, setGameIsWon] = useState(false);
  const [level, setLevel] = useState('0');

  const dispatch = useDispatch();

  const resetGame = () => {
    resetPaths();
    resetStats();
    setGameIsLost(false);
    setGameIsWon(false);
    setAnswer('');
  };

  const resetPaths = () => {
    let copyLocalitatiFill = localitatiFill;
    for (const localitate in copyLocalitatiFill) {
      if (copyLocalitatiFill[localitate] !== 'white') {
        copyLocalitatiFill[localitate] = 'white';
      }
    }
  };

  const resetStats = () => {
    dispatch(resetLocalitati());
    dispatch(setQuestion('Olt'));
    setRemainingAnswers(LOCALITATI_OLT.length);
    setCorrectAnswers(0);
    setWrongAnswers(0);
  };

  const resetRedPaths = object => {
    for (const property in object) {
      if (object[property] === 'red') {
        object[property] = 'white';
      }
    }
  };

  const disablePaths = (localitati, localitatiFill) => {
    for (const localitate in localitatiFill) {
      if (
        !localitati.includes(localitate) &&
        localitatiFill[localitate] === 'white'
      ) {
        localitatiFill[localitate] = 'gray';
      }
    }
  };

  const validateAnswer = localitate => {
    if (localitatiFill[localitate] === 'white' && timer.isOn) {
      setAnswer(localitate);
    }
  };

  const winGame = () => {
    dispatch(setTimerOn(false));
    setGameIsWon(true);
  };

  const loseGame = () => {
    dispatch(setTimerOn(false));
    setGameIsLost(true);
  };

  useEffect(() => {
    let copyLocalitatiFill = localitatiFill;
    if (question === answer && answer !== '') {
      copyLocalitatiFill[answer] = 'green';
      setCorrectAnswers(prevCorrectAnswers => {
        return prevCorrectAnswers + 1;
      });
      setRemainingAnswers(prevRemainingAnswers => {
        return prevRemainingAnswers - 1;
      });

      dispatch(removeLocalitate(answer));
      resetRedPaths(copyLocalitatiFill);
    } else if (question !== answer && answer !== '') {
      copyLocalitatiFill[answer] = 'red';
      setWrongAnswers(prevWrongAnswers => {
        return prevWrongAnswers + 1;
      });
    }

    setLocalitatiFill(copyLocalitatiFill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  useEffect(() => {
    if (
      level === '0' ||
      level === '' ||
      gameIsWon ||
      gameIsLost ||
      timer.isOn === false
    ) {
      return;
    }

    dispatch(setLocalitatiByLevel(parseInt(level)));

    let copyLocalitatiFill = localitatiFill;
    disablePaths(
      LOCALITATI_OLT.slice(0, 8 * parseInt(level)),
      copyLocalitatiFill
    );

    setLocalitatiFill(copyLocalitatiFill);
  }, [timer.isOn]);

  useEffect(() => {
    setRemainingAnswers(localitati.length);
  }, [localitati]);

  useEffect(() => {
    if (remainingAnswers === 0) {
      winGame();
    }
  }, [remainingAnswers]);

  return (
    <ChakraProvider theme={theme}>
      <Flex ml="auto">
        <ColorModeSwitcher ml="auto" />
      </Flex>
      <Flex className="gameContainer" mt={8} mx="auto" maxW="800px" w="100%">
        <Box>
          <Map
            alignItems="center"
            pointerEvents="none"
            handleClick={validateAnswer}
            localitatiFill={localitatiFill}
          />
        </Box>
        <Box className="gameInterface" alignContent="center">
          <Flex mb={5}>
            <Question />
            <CompletionPercentage
              correctAnswers={correctAnswers}
              remainingAnswers={remainingAnswers}
            />
          </Flex>
          <Timer maxTime={maxTime} loseGame={loseGame} />
          <Flex>
            <Counter
              remainingAnswers={remainingAnswers}
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
            />
          </Flex>
          {gameIsWon ? <GameResult result={'won'} level={level} /> : null}
          {gameIsLost ? <GameResult result={'lost'} level={level} /> : null}
          {timer.isOn ? null : <LevelSelect setLevel={setLevel} />}
          <GameButtons
            gameIsLost={gameIsLost}
            gameIsWon={gameIsWon}
            level={level}
            resetGame={resetGame}
            setLevel={setLevel}
          />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
