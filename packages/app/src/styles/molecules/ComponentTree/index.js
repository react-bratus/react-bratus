import PropTypes from 'prop-types';
import React from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';

import ComponentNode from '../../atoms/ComponentNode';
import MiniMap from '../../atoms/MiniMap';

const ComponentTree = ({ elements }) => {
  return (
    <>
      {elements && (
        <ReactFlow
          elements={elements}
          nodeTypes={{ reactComponent: ComponentNode }}
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      )}
    </>
  );
};

ComponentTree.propTypes = {
  elements: PropTypes.any,
};

export default ComponentTree;
