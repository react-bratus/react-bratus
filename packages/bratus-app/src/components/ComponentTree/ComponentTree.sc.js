import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';

export const LayoutButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-left: 7px;
`;

export const LayoutButton = styled(Button)`
  &:active {
    transform: translateY(4px);
  }
`;
