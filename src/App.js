import { Box, ChakraProvider, Flex, Text, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import CompletionPercentage from './components/CompletionPercentage';
import Counter from './components/Counter';
import GameButtons from './components/GameButtons';
import GameResult from './components/GameResult';
import LevelSelect from './components/LevelSelect';
import Map from './components/Map';
import Question from './components/Question';
import StartStopButtons from './components/StartStopButtons';
import Timer from './components/Timer';
import LOCALITATI_OLT from './constants/LOCALITATI_OLT';
import localitatiFillDictionary from './localitatiFillDictionary';
import theme from './theme';

function App() {
  const maxTime = 480000;

  const [localitatiFill, setLocalitatiFill] = useState(
    localitatiFillDictionary
  );
  const [localitati, setLocalitati] = useState(LOCALITATI_OLT);
  const [timerOn, setTimerOn] = useState(false);
  const [time, setTime] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [remainingAnswers, setRemainingAnswers] = useState(localitati.length);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [gameIsLost, setGameIsLost] = useState(false);
  const [gameIsWon, setGameIsWon] = useState(false);
  const [level, setLevel] = useState('0');

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
    setLocalitati(LOCALITATI_OLT);
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
    if (localitatiFill[localitate] === 'white' && timerOn) {
      setAnswer(localitate);
    }
  };

  const validateQuestion = localitate => {
    setQuestion(localitate);
  };

  const winGame = () => {
    setTimerOn(false);
    setGameIsWon(true);
  };

  const loseGame = () => {
    setTimerOn(false);
    setGameIsLost(true);
  };

  const recordTime = time => {
    setTime(maxTime - time);
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

      setLocalitati(localitati.filter(localitate => localitate !== answer));
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
    if (level === '0' || level === '' || gameIsWon || gameIsLost) {
      return;
    }

    setLocalitati(LOCALITATI_OLT.slice(0, 8 * parseInt(level)));

    let copyLocalitatiFill = localitatiFill;
    disablePaths(
      LOCALITATI_OLT.slice(0, 8 * parseInt(level)),
      copyLocalitatiFill
    );

    setLocalitatiFill(copyLocalitatiFill);
  }, [timerOn]);

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
            <Question
              localitati={localitati}
              handleChange={validateQuestion}
              timerOn={timerOn}
            />
            <CompletionPercentage
              correctAnswers={correctAnswers}
              remainingAnswers={remainingAnswers}
            />
          </Flex>
          <Timer
            maxTime={maxTime}
            timerOn={timerOn}
            loseGame={loseGame}
            onTimePause={recordTime}
          />
          <Flex>
            <Counter
              remainingAnswers={remainingAnswers}
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
            />
          </Flex>
          {gameIsWon ? (
            <GameResult result={'won'} time={time} level={level} />
          ) : null}
          {gameIsLost ? (
            <GameResult result={'lost'} time={time} level={level} />
          ) : null}
          {timerOn ? null : <LevelSelect setLevel={setLevel} />}
          <GameButtons
            gameIsLost={gameIsLost}
            gameIsWon={gameIsWon}
            level={level}
            resetGame={resetGame}
            setTimerOn={setTimerOn}
            timerOn={timerOn}
            setLevel={setLevel}
          />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
