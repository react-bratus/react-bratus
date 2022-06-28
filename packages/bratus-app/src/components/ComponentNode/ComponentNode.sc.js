import { Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components';
import { BackgroundLabels, GraphLabels } from '../../utils/constants/constants';
import {
  baseUnit,
  nodeWidth,
  horizontalViewNodeHeight,
} from '../../utils/constants/units';
import { Handle } from 'react-flow-renderer';
import { Colors } from '../../utils/constants/colors';

// The height and the width of the tree nodes, are dynamically adjusted based on the
// layout of the tree and the node visualization options that the user chooses.
export const StyledNode = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  position: relative;
  padding: ${baseUnit}px;
  border-radius: 100px;

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

  border: ${({ isHighlighted }) => {
    return isHighlighted
      ? `3px solid ${Colors.nodeBorder}`
      : `1px solid ${Colors.nodeBorder}`;
  }};
`;

export const StyledHandle = styled(Handle)`
  background: #fff;
  border-radius: 100%;
  position: absolute;

  border: ${({ isHighlighted }) => {
    return isHighlighted
      ? `2px solid ${Colors.nodeBorder}`
      : `1px solid ${Colors.nodeBorder}`;
  }};

  height: ${({ isHighlighted }) => {
    return isHighlighted ? '12px' : '8px';
  }};

  width: ${({ isHighlighted }) => {
    return isHighlighted ? '12px' : '8px';
  }};

  // Hack for Handle style for vertical view
  &.react-flow__handle-left {
    left: ${({ isHighlighted }) => {
      return isHighlighted ? '-8px' : '-4px';
    }};
  }

  &.react-flow__handle-right {
    right: ${({ isHighlighted }) => {
      return isHighlighted ? '-8px' : '-4px';
    }};
  }

  // Hack for Handle style for horizontal view
  &.react-flow__handle-top {
    top: ${({ isHighlighted }) => {
      return isHighlighted ? '-8px' : '-4px';
    }};
  }

  &.react-flow__handle-bottom {
    bottom: ${({ isHighlighted }) => {
      return isHighlighted ? '-8px' : '-4px';
    }};
  }
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
