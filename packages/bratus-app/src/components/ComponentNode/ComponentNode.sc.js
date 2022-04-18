import { Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components';
import { BackgroundLabels, GraphLabels } from '../../utils/constants/constants';
import {
  baseUnit,
  nodeWidth,
  horizontalViewNodeHeight,
} from '../../utils/constants/units';

// The height and the width of the tree nodes, are dynamically adjusted based on the
// layout of the tree and the node visualization options that the user chooses.
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
