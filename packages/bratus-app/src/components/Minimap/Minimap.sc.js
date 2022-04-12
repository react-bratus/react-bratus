import MiniMap from './MiniMap';
import styled from 'styled-components';

import { baseUnit } from '../../utils/tokens/units';

const StyledMiniMap = styled(MiniMap)`
  position: absolute;
  width: 280px;
  height: 205px;
  right: ${baseUnit}px;
  top: ${baseUnit}px;
  border-radius: 15px;
  border: 1px solid #001529;
  opacity: 1;
  -webkit-box-shadow: 4px 6px 11px -3px rgba(0, 0, 0, 0.84);
  box-shadow: 4px 6px 11px -3px rgba(0, 0, 0, 0.84);
`;

export default StyledMiniMap;
