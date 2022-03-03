import { Button, Layout } from 'antd';
import styled from 'styled-components';

import { baseUnit, navigationWidth } from '../../utils/tokens/units';

export const MainContentWrapper = styled(Layout)`
  margin-left: ${navigationWidth}px;
  padding: 1rem;
  height: 100vh;
`;

export const HelpPanelButton = styled(Button)`
  position: absolute;
  bottom: ${baseUnit * 2}px;
  left: ${baseUnit * 2}px;
`;
