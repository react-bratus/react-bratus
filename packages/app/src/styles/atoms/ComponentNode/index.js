import PropTypes from 'prop-types';
import React from 'react';
import { Handle } from 'react-flow-renderer';
import styled from 'styled-components';

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
  border: 1px solid;
  border-color: black;
  background-color: white;
`;
const ComponentNode = ({ data }) => {
  return (
    <StyledNode linesOfCode={data.linesOfCode}>
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
  data: PropTypes.any,
};

export default ComponentNode;
