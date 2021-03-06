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
import { setAnswer } from './redux/answer/actions';
import {
  incrementCorrectAnswers,
  incrementWrongAnswers,
  setCorrectAnswers,
  setRemainingAnswers,
  setWrongAnswers,
} from './redux/gameStats/actions';
import { resetGameResults, setGameResults } from './redux/gameResults/actions';
import ModeSelect from './components/ModeSelect';
import { setLevel } from './redux/level/actions';

function App() {
  const [localitatiFill, setLocalitatiFill] = useState(
    localitatiFillDictionary
  );
  const localitatiState = useSelector(state => state.localitati);
  const localitati = localitatiState.localitati;
  const timer = useSelector(state => state.timer);
  const question = useSelector(state => state.question);
  const answer = useSelector(state => state.answer);
  const gameStats = useSelector(state => state.gameStats);
  const level = useSelector(state => state.level);
  const gameResults = useSelector(state => state.gameResults);
  const gameMode = useSelector(state => state.gameMode);

  const dispatch = useDispatch();

  const resetGame = () => {
    resetPaths();
    resetStats();
    dispatch(resetGameResults());
    dispatch(setAnswer(''));
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
    dispatch(setRemainingAnswers(LOCALITATI_OLT.length));
    dispatch(setCorrectAnswers(0));
    dispatch(setWrongAnswers(0));
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
      dispatch(setAnswer(localitate));
    }
  };

  const winGame = () => {
    dispatch(setTimerOn(false));
    dispatch(
      setGameResults({
        spentTime: timer.spentTime,
        level,
        isWon: true,
        isFinished: true,
        gameMode,
      })
    );
  };

  const loseGame = () => {
    dispatch(setTimerOn(false));
    dispatch(
      setGameResults({
        spentTime: timer.spentTime,
        level,
        isWon: false,
        isFinished: true,
      })
    );
  };

  useEffect(() => {
    let copyLocalitatiFill = localitatiFill;
    if (question === answer && answer !== '') {
      copyLocalitatiFill[answer] = 'green';
      dispatch(incrementCorrectAnswers());

      dispatch(removeLocalitate(answer));
      resetRedPaths(copyLocalitatiFill);
    } else if (question !== answer && answer !== '') {
      copyLocalitatiFill[answer] = 'red';
      dispatch(incrementWrongAnswers());
      if (
        gameMode === 'ordine' ||
        gameMode === 'pro' ||
        gameStats.wrongAnswers === 4
      ) {
        loseGame();
      }
    }

    setLocalitatiFill(copyLocalitatiFill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  useEffect(() => {
    if (
      level === 0 ||
      level === '' ||
      gameResults.isFinished ||
      timer.isOn === false
    ) {
      return;
    }

    dispatch(setLocalitatiByLevel(parseInt(level)));

    let copyLocalitatiFill = localitatiFill;
    if (level === '0') {
      disablePaths(LOCALITATI_OLT.slice(0, 2), copyLocalitatiFill);
    } else {
      disablePaths(
        LOCALITATI_OLT.slice(0, 8 * parseInt(level)),
        copyLocalitatiFill
      );
    }

    setLocalitatiFill(copyLocalitatiFill);
  }, [timer.isOn]);

  useEffect(() => {
    dispatch(setRemainingAnswers(localitati.length));
  }, [localitati]);

  useEffect(() => {
    if (gameStats.remainingAnswers === 0 && timer.isOn) {
      winGame();
    }
  }, [gameStats.remainingAnswers]);

  useEffect(() => {
    if (gameMode === 'ordine' || gameMode === 'pro') {
      dispatch(setLevel('14'));
    }
  }, [gameMode]);

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
        <Box className="gameInterface">
          <Flex mb={5}>
            <Question />
            <CompletionPercentage />
          </Flex>
          <Timer loseGame={loseGame} />
          {/* <Flex>
            <Counter />
          </Flex> */}
          {gameResults.isFinished ? <GameResult /> : null}
          {!timer.isOn ? <ModeSelect /> : null}
          {gameMode === 'nivele' && !timer.isOn ? <LevelSelect /> : null}
          <GameButtons resetGame={resetGame} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
