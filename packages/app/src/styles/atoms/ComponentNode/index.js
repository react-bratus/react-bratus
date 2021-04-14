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
  background-color: white;
  border: ${({ timesUsed }) => (timesUsed < 5 ? 1 : 3)}px solid;
  border-color: black;
`;
const ComponentNode = ({ data }) => {
  return (
    <StyledNode
      linesOfCode={data.linesOfCode}
      timesUsed={data.component.timesUsed}
    >
      {data.inDegree > 0 && <Handle type="target" position="left" />}
      <div>
        {data.label}({data.component.timesUsed})
      </div>
      {data.outDegree > 0 && <Handle type="source" position="right" />}
    </StyledNode>
  );
};

ComponentNode.propTypes = {
  data: PropTypes.any,
};

export default ComponentNode;
