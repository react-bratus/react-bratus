import { Button, Layout } from 'antd';
import styled from 'styled-components';

import { baseUnit, navigationWidth } from '../../utils/tokens/units';

export const MainContentWrapper = styled(Layout)`
  margin-left: ${({ collapsed }) =>
    collapsed === false ? `${navigationWidth}px` : '0'};
  padding: 1rem;
  height: 100vh;
`;

export const NavigationTriggerButton = styled(Button)`
  position: absolute;
  bottom: ${baseUnit * 2}px;
  left: ${({ collapsed }) =>
    collapsed === true
      ? `${baseUnit * 2}px`
      : `${navigationWidth + baseUnit * 2}px`};
  z-index: 999;
`;

export const MinimapTriggerButton = styled(Button)`
  position: absolute;
  top: ${({ isMinimapVisible }) =>
    isMinimapVisible === true ? `${baseUnit * 19.2}px` : `${baseUnit}px`};
  right: ${baseUnit}px;
  z-index: 999;
`;
