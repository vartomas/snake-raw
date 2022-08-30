import { useState, useEffect } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

export const useGame = () => {
  const getRandomPointPos = (): [number, number] => [Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1];

  const [gridSize, setGridSize] = useState<number>(50);
  const [positions, setPositions] = useState<[number, number][]>([[25, 25]]);
  const [direction, setDirection] = useState<Direction>('right');
  const [speed, setSpeed] = useState(20);
  const [length, setLength] = useState(5);
  const [pointPos, setPointPos] = useState<[number, number]>(getRandomPointPos());

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

  const eatPoint = () => {
    const newRandomPos = getRandomPointPos();
    setPointPos(newRandomPos);
    setLength((prev) => prev + 1);
  };

  const isCrashedToTail = (headPos: [number, number]) => !!positions.find((x) => x[0] === headPos[0] && x[1] === headPos[1]);

  const resetGame = () => {
    setPositions([[25, 25]]);
    setLength(5);
    setDirection('right');
  };

  useEffect(() => {
    const keyPressEvent = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && direction !== 'right') {
        setDirection('left');
      }

      if (e.key === 'ArrowRight' && direction !== 'left') {
        setDirection('right');
      }

      if (e.key === 'ArrowUp' && direction !== 'down') {
        setDirection('up');
      }

      if (e.key === 'ArrowDown' && direction !== 'up') {
        setDirection('down');
      }
    };

    document.addEventListener('keydown', keyPressEvent);

    return () => document.removeEventListener('keydown', keyPressEvent);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(() => {
      const cutEnd = (arr: [number, number][]) => (length >= positions.length ? arr : arr.slice(0, length - positions.length));

      const nextHeadPosition = getNextHeadPosition();

      if (nextHeadPosition[0] === pointPos[0] && nextHeadPosition[1] === pointPos[1]) {
        eatPoint();
      }

      if (
        nextHeadPosition[0] < 1 ||
        nextHeadPosition[0] > 50 ||
        nextHeadPosition[1] < 1 ||
        nextHeadPosition[1] > 50 ||
        isCrashedToTail(nextHeadPosition)
      ) {
        resetGame();
      } else {
        setPositions((prev) => [nextHeadPosition, ...cutEnd(prev)]);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [positions, length]);

  return { gridSize, positions, pointPos, length };
};
