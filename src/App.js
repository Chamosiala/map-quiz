import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  theme,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import AnswerPercentage from './components/AnswerPercentage';
import Counter from './components/Counter';
import Map from './components/Map';
import Question from './components/Question';
import Timer from './components/Timer';
import LOCALITATI_OLT from './constants/LOCALITATI_OLT';
import localitatiFillDictionary from './localitatiFillDictionary';

function App() {
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
    setTime(time);
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
    console.log(localitatiFill);
  }, [answer]);

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
      <Box mt={8} mx="auto" maxW="800px" w="100%">
        <Flex>
          <Map
            alignItems="center"
            pointerEvents="none"
            handleClick={validateAnswer}
            localitatiFill={localitatiFill}
          />
          <Box>
            <Flex mb={5}>
              <Question
                localitati={localitati}
                handleChange={validateQuestion}
                timerOn={timerOn}
              />
              {/* <AnswerPercentage /> */}
              <Text fontSize="large" p={5} backgroundColor="teal" mb="auto">
                {Math.floor((100 * correctAnswers) / LOCALITATI_OLT.length)}%
              </Text>
            </Flex>
            <Timer
              timerOn={timerOn}
              loseGame={loseGame}
              onTimePause={recordTime}
            />
            <Flex mt="40px">
              <Counter
                remainingAnswers={remainingAnswers}
                correctAnswers={correctAnswers}
                wrongAnswers={wrongAnswers}
              />
            </Flex>
            {gameIsWon ? (
              <Text mt="100px" mx="100px">
                Ai castigat!
              </Text>
            ) : null}
            {gameIsLost ? (
              <Text mt="100px" mx="100px">
                Ai pierdut!
              </Text>
            ) : null}
            {timerOn ? (
              <Button
                backgroundColor="red"
                mt="150px"
                mx="100px"
                onClick={() => {
                  setTimerOn(false);
                  resetGame();
                }}
              >
                Quit
              </Button>
            ) : (
              <Button
                backgroundColor="green"
                mt="150px"
                mx="100px"
                onClick={() => {
                  setTimerOn(true);
                  resetGame();
                }}
              >
                {gameIsLost || gameIsWon ? 'Play Again' : 'Play'}
              </Button>
            )}
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
