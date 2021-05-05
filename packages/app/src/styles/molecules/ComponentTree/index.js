import ColorHash from 'color-hash';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';

import HighlightedComponentsContext from '../../../contexts/HighlightedComponentsContext';
import ComponentNode from '../../atoms/ComponentNode';
import MiniMap from '../../atoms/MiniMap';

const ComponentTree = ({ elements }) => {
  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );

  const highlightComponent = (node) => {
    const componentName = node ? node.data.label : null;
    setHighlightedComponents([
      ...highlightedComponents,
      {
        id: node.id,
        componentName: componentName,
        locked: false,
        search: false,
      },
    ]);
  };

  const removeHighlight = (node, force) => {
    const index = highlightedComponents.findIndex(
      (component) => component.id === node.id
    );
    if (index !== -1) {
      const highlightedComponent = highlightedComponents[index];
      if (!highlightedComponent.locked || force) {
        const array = [...highlightedComponents];
        array.splice(index, 1);
        setHighlightedComponents(array);
      }
    }
  };

  const resetHighlight = () => setHighlightedComponents([]);

  const isHighlighted = (node) => {
    return highlightedComponents.some((component) =>
      node.id.match(
        `${component.componentName}:+.+|${component.componentName}$`
      )
    );
  };
  return (
    <>
      {elements && (
        <ReactFlow
          elements={elements}
          nodeTypes={{ reactComponent: ComponentNode }}
          onNodeMouseEnter={(_e, node) => highlightComponent(node, false)}
          onNodeMouseLeave={(_e, node) => removeHighlight(node, false)}
          onPaneClick={resetHighlight}
        >
          <MiniMap
            nodeColor={(node) => {
              if (isHighlighted(node)) {
                return 'red';
              } else {
                return new ColorHash({ lightness: 0.5 }).hex(node.data.label);
              }
            }}
          />
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
