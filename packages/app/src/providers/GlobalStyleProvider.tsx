import { createGlobalStyle } from 'styled-components';

import { fontFamilySans } from '../styles/tokens';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  body {
    font-family: ${fontFamilySans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
