import styled from 'styled-components';

import { baseUnit, navigationWidth } from '../../../../utils/tokens/units';

export const SectionTitleWrapper = styled.div`
  padding-top: ${baseUnit * 2}px;
  padding-bottom: ${baseUnit}px;
  padding-left: ${baseUnit * 2}px;
`;

export const StyledSectionTitle = styled.h2`
  color: white;
  font-weight: 400;
  text-align: right;
  margin-bottom: ${baseUnit}px;
  padding-right: ${baseUnit}px;
`;

export const SectionDivider = styled.hr`
  width: ${navigationWidth - 20}px;
  color: blue;
  margin: 0;
  margin-left: auto;
`;
