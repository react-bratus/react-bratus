import React from 'react';
import styled from 'styled-components';

import { baseUnit, navigationWidth } from '../../tokens/units';

const Wrapper = styled.div`
  padding-top: ${baseUnit * 2}px;
  padding-bottom: ${baseUnit}px;
  padding-left: ${baseUnit * 2}px;
`;

const StyledTitle = styled.h2`
  color: white;
  font-weight: 400;
  text-align: right;
  margin-bottom: ${baseUnit}px;
  padding-right: ${baseUnit}px;
`;
const Line = styled.hr`
  width: ${navigationWidth - 20}px;
  color: blue;
  margin: 0;
  margin-left: auto;
`;

const MenuTitle = ({ children }) => {
  return (
    <Wrapper>
      <StyledTitle>{children}</StyledTitle>
      <Line />
    </Wrapper>
  );
};

export default MenuTitle;
