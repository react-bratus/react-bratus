import { MiniMap } from 'react-flow-renderer';
import styled from 'styled-components';

import { baseUnit } from '../../tokens/units';

const StyledMiniMap = styled(MiniMap)`
  position: absolute;
  left: ${baseUnit + 26}px;
`;

export default StyledMiniMap;
