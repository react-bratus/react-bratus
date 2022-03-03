import { MiniMap } from 'react-flow-renderer';
import styled from 'styled-components';

import { baseUnit } from '../../utils/tokens/units';

const StyledMiniMap = styled(MiniMap)`
  position: absolute;
  min-width: 300px;
  min-height: 300px;
  right: ${baseUnit}px;
  top: ${baseUnit}px;
`;

export default StyledMiniMap;
