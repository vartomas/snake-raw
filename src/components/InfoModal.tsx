import styled from 'styled-components';

interface Props {
  start: boolean;
  gameOver: boolean;
  length: number;
}

const InfoModal: React.FC<Props> = ({ start, gameOver, length }) => {
  const startContents = (
    <Paragraph>
      Use arrow keys to navigate, press <b>space</b> bar to start the game
    </Paragraph>
  );
  const gameOverContents = <Paragraph>Your score: {length - 5}, press spacebar to restart</Paragraph>;

  return (
    <Container visible={start || gameOver}>
      {start && startContents} {gameOver && gameOverContents}
    </Container>
  );
};

const Container = styled.div<{ visible: boolean }>`
  width: 600px;
  height: 600px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #1d1d1d;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const Paragraph = styled.p`
  color: white;
  font-size: 24px;
`;

export default InfoModal;
