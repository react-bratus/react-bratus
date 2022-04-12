import MiniMap from './MiniMap';
import styled from 'styled-components';

import { baseUnit } from '../../utils/tokens/units';

const StyledMiniMap = styled(MiniMap)`
  position: absolute;
  width: 300px;
  height: 220px;
  right: ${baseUnit}px;
  top: ${baseUnit}px;
  border-radius: 15px;
  border: 1px solid #001529;
  opacity: 1;
`;

export default StyledMiniMap;
