import React from 'react';
import styled from 'styled-components';
import logo from './assets/logo.svg';
import GlobalStyleProvider from './providers/GlobalStyleProvider';

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const StyledImage = styled.img`
  height: 40vmin;
  pointer-events: none;
`;

const StyledLink = styled.a`
  color: #61dafb;
`;

const test = () => {
  fetch('http://localhost:3000/ping')
    .then((res) => res.json())
    .then((body) => console.log(body));
};
test();
const App: React.FC = () => {
  return (
    <Wrapper>
      <GlobalStyleProvider />
      <Header>
        <StyledImage src={logo} className="App-logo" alt="logo" />

        <StyledLink
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          FUCK
        </StyledLink>
      </Header>
    </Wrapper>
  );
};

export default App;
