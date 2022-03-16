import { EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import styled, { css } from 'styled-components';

import {
  baseNodeHeight,
  baseUnit,
  borderRadius,
  nodeWidth,
} from '../../utils/tokens/units';

export const StyledNode = styled.div`
  height: ${({ linesOfCode }) => baseNodeHeight + linesOfCode}px;
  width: ${nodeWidth}px;
  padding: ${baseUnit}px;
  border-radius: ${borderRadius}px;
  border: ${({ isHighlighted, isLocked }) => {
    if (!isHighlighted) {
      return '1px solid black';
    } else {
      return isLocked ? '3px solid black' : '5px solid red';
    }
  }};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  position: relative;
`;

export const StyledTitle = styled(Title)`
  color: ${({ color }) => color};
  font-weight: 600;
  font-size: 17px;
  line-height: 1.7px;
  margin-bottom: 5px;
`;

export const StyledNodeContent = styled(Col)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const NodeContentRow = styled(Row)`
  flex-grow: 1;
  padding-bottom: 12px;
  justify-content: center;
`;

export const NodeButtonsRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;

export const TimeUsedText = styled(Text)`
  font-size: 18px;
  line-height: 18px;
  color: ${({ color }) => color};
`;

const antDesignIconStyles = css`
  font-size: 24px;
`;

export const LockIcon = styled(LockOutlined)`
  ${antDesignIconStyles}
`;

export const UnlockIcon = styled(UnlockOutlined)`
  ${antDesignIconStyles}
`;

export const EyeIcon = styled(EyeOutlined)`
  ${antDesignIconStyles}
`;
