import { Divider } from 'antd';
import { Typography } from 'antd';
const { Link } = Typography;
import styled from 'styled-components';
import { baseUnit } from '../../utils/constants/units';

export const VerticalDivider = styled(Divider)`
  height: auto;
  width: 1px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const StyledLink = styled(Link)`
  margin-left: 9px;
`;

export const StyledLi = styled.li`
  list-style-type: none;
  margin-bottom: ${baseUnit / 2}px;
`;

export const StyledUl = styled.ul`
  padding: 0;
`;
