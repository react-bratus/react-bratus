import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Handle } from 'react-flow-renderer';
import styled from 'styled-components';

import HighlightedComponentsContext from '../../../contexts/HighlightedComponentsContext';
import {
  baseNodeHeight,
  baseUnit,
  borderRadius,
  nodeWidth,
} from '../../tokens/units';
const StyledNode = styled.div`
  height: ${({ linesOfCode }) => baseNodeHeight + linesOfCode}px;
  width: ${nodeWidth}px;
  padding: ${baseUnit}px;
  border-radius: ${borderRadius}px;
  border: ${({ isHighlighted }) =>
    isHighlighted ? '3px dotted red' : '1px solid black'};
  background-color: white;
`;
const ComponentNode = ({ id, data }) => {
  const { highlightedComponent } = useContext(HighlightedComponentsContext);
  const isHighlighted = () => {
    if (highlightedComponent.componentName) {
      return id.match(
        `${highlightedComponent.componentName}:+.+|${highlightedComponent.componentName}$`
      );
    }
    return false;
  };
  return (
    <StyledNode linesOfCode={data.linesOfCode} isHighlighted={isHighlighted()}>
      {data.inDegree > 0 && <Handle type="target" position="left" />}
      <div>
        {data.label}
        {data.component.timesUsed > 1 && `(${data.component.timesUsed})`}
      </div>
      {data.outDegree > 0 && <Handle type="source" position="right" />}
    </StyledNode>
  );
};

ComponentNode.propTypes = {
  id: PropTypes.string,
  data: PropTypes.any,
};

export default ComponentNode;
