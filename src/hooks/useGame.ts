import { useState, useEffect } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

export const useGame = () => {
  const getRandomPointPos = (): [number, number] => [Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1];

  const [gridSize, setGridSize] = useState<number>(50);
  const [positions, setPositions] = useState<[number, number][]>([[25, 25]]);
  const [direction, setDirection] = useState<Direction>('right');
  const [speed, setSpeed] = useState(30);
  const [length, setLength] = useState(5);
  const [pointPos, setPointPos] = useState<[number, number]>(getRandomPointPos());
  const [startGameScreen, setStartGameScreen] = useState(true);
  const [gameOverScreen, setGameOverScreen] = useState(false);

  const getNextHeadPosition = (): [number, number] => {
    switch (direction) {
      case 'right':
        return [positions[0][0], positions[0][1] + 1];
      case 'left':
        return [positions[0][0], positions[0][1] - 1];
      case 'up':
        return [positions[0][0] - 1, positions[0][1]];
      case 'down':
        return [positions[0][0] + 1, positions[0][1]];
      default:
        return [0, 0];
    }
  };

  const setNextHeadPos = () => {
    const cutEnd = (arr: [number, number][]) => (length >= positions.length ? arr : arr.slice(0, length - positions.length));

    const nextHeadPosition = getNextHeadPosition();

    if (nextHeadPosition[0] === pointPos[0] && nextHeadPosition[1] === pointPos[1]) {
      eatPoint();
    }

    checkIfCrashToWall(nextHeadPosition);
    checkIfCrashToTail(nextHeadPosition);

    if (!startGameScreen && !gameOverScreen) {
      setPositions((prev) => [nextHeadPosition, ...cutEnd(prev)]);
    }
  };

  const eatPoint = () => {
    const newRandomPos = getRandomPointPos();
    setPointPos(newRandomPos);
    setLength((prev) => prev + 1);
  };

  const resetGame = () => {
    setPositions([[25, 25]]);
    setLength(5);
    setDirection('right');
  };

  const gameOver = () => setGameOverScreen(true);

  const startGame = () => {
    setGameOverScreen(false);
    setStartGameScreen(false);
    resetGame();
  };

  const checkIfCrashToWall = (headPos: [number, number]) => {
    if (headPos[0] < 1 || headPos[0] > 50 || headPos[1] < 1 || headPos[1] > 50) {
      gameOver();
    }
  };

  const checkIfCrashToTail = (headPos: [number, number]) => {
    if (!!positions.find((x) => x[0] === headPos[0] && x[1] === headPos[1])) {
      gameOver();
    }
  };

  useEffect(() => {
    const keyPressEvent = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && direction !== 'right') {
        setDirection('left');
        setNextHeadPos();
      }

      if (e.key === 'ArrowRight' && direction !== 'left') {
        setDirection('right');
        setNextHeadPos();
      }

      if (e.key === 'ArrowUp' && direction !== 'down') {
        setDirection('up');
        setNextHeadPos();
      }

      if (e.key === 'ArrowDown' && direction !== 'up') {
        setDirection('down');
        setNextHeadPos();
      }

      if ((startGameScreen || gameOverScreen) && e.key === ' ') {
        startGame();
      }
    };

    document.addEventListener('keydown', keyPressEvent);

    return () => document.removeEventListener('keydown', keyPressEvent);
  }, [direction, positions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextHeadPos();
    }, speed);

    return () => clearInterval(interval);
  }, [positions, length]);

  return { gridSize, positions, pointPos, length, startGameScreen, gameOverScreen };
};
