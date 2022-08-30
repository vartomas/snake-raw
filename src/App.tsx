import styled from 'styled-components';
import Game from './components/Game';

const App = () => {
  return (
    <Window>
      <Game />
    </Window>
  );
};

const Window = styled.div`
  min-height: 100vh;
  min-width: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
