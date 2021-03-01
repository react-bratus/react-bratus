import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const THEME = {
  primary: '#3e3e3e',
  secondary: '#000000',
};

const ThemeProvider = ({ children }) => {
  return <StyledThemeProvider theme={THEME}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
