import styled from 'styled-components';

import { baseUnit } from '../../../../utils/tokens/units';

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  padding: ${baseUnit}px;
  margin-left: auto;
  width: 100%;

  > * {
    &:not(:last-child) {
      margin-left: ${baseUnit}px;
      margin-bottom: ${baseUnit}px;
    }
  }
`;
