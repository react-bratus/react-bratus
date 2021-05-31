import React from 'react';
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
const THEME = {
  primary: '#00D8FF',
  secondary: '#001529',
};
const GlobalStyle = createGlobalStyle`
.ant-select-tree .ant-select-tree-treenode:not(.ant-select-tree .ant-select-tree-treenode-disabled).filter-node .ant-select-tree-title {
  background-color: red;
  color: white;
}
`;

const ThemeProvider = ({ children }) => {
  return (
    <StyledThemeProvider theme={THEME}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
