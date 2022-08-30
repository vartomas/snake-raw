import styled from 'styled-components';
import { useGame } from '../hooks/useGame';

const Game = () => {
  const { gridSize, positions, pointPos, length } = useGame();

  return (
    <Wrapper>
      <ScoreHeader>Score: {length - 5}</ScoreHeader>
      <Container>
        {[...Array(gridSize)].map((_, i) => (
          <Line key={i}>
            {[...Array(gridSize)].map((_, j) => (
              <Tile
                filled={!!positions.find((x) => x[0] === i + 1 && x[1] === j + 1)}
                point={pointPos[0] === i + 1 && pointPos[1] === j + 1}
                key={`${i}${j}`}
              />
            ))}
          </Line>
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ScoreHeader = styled.h2`
  color: white;
  font-size: 30px;
  margin-bottom: 16px;
`;

const Container = styled.div`
  width: 500px;
  height: 500px;
  background-color: #1d1d1d;
`;

const Line = styled.div`
  display: flex;
`;

const Tile = styled.div<{ filled: boolean; point: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.filled ? 'red' : 'none')};
  background-color: ${(props) => (props.point ? 'green' : 'none')};
`;

export default Game;
