import { EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import styled, { css } from 'styled-components';
import { BackgroundLabels, GraphLabels } from '../../utils/constants/constants';

import {
  baseNodeHeight,
  baseUnit,
  nodeWidth,
} from '../../utils/constants/units';
const horizontalViewNodeHeight = baseNodeHeight / 2.3;

export const StyledNode = styled.div`
  height: ${({ linesOfCode, componentBackground, treeLayoutDirection }) => {
    if (componentBackground.mode === BackgroundLabels.size) {
      if (treeLayoutDirection === GraphLabels.topToBottom) {
        return `${horizontalViewNodeHeight + linesOfCode}px`;
      }
    }
    return '75px';
  }};
  width: ${({ linesOfCode, componentBackground, treeLayoutDirection }) => {
    if (componentBackground.mode === BackgroundLabels.size) {
      if (treeLayoutDirection === GraphLabels.leftToRight) {
        return `${nodeWidth + linesOfCode}px`;
      }
    }
    return `${nodeWidth}px`;
  }};
  padding: ${baseUnit}px;
  border-radius: 100px;
  border: ${({ isHighlighted }) => {
    return isHighlighted ? '1.5px solid black' : '1px solid black';
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
  align-items: center;
  justify-content: center;
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
