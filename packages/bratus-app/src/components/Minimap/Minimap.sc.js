import MiniMap from './MiniMap';
import styled from 'styled-components';

import { baseUnit } from '../../utils/tokens/units';

const StyledMiniMap = styled(MiniMap)`
  position: absolute;
  min-width: 300px;
  min-height: 300px;
  right: ${baseUnit}px;
  top: ${baseUnit}px;
  opacity: 0.7;
`;

export default StyledMiniMap;
