import ReactFlow, {
  Controls as ZoomControlButtons,
  ReactFlowProvider,
} from 'react-flow-renderer';
// import ColorHash from 'color-hash';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

// import StyledMiniMap from '../Minimap/Minimap.sc';
import HighlightedComponentsContext from '../../contexts/HighlightedComponentsContext';
import ComponentNode from '../ComponentNode/ComponentNode';
// import { getLayoutedElements } from '../../utils/functions/graphUtils';
// import { GraphLabels } from '../../utils/tokens/constants';

const ComponentTree = ({ nodesAndEdges, direction }) => {
  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );

  console.log(direction);

  const onLoadTree = (reactFlowInstance) => reactFlowInstance.fitView();

  const highlightComponent = (node) => {
    const componentName = node ? node.data.label : null;
    setHighlightedComponents([
      ...highlightedComponents.filter((_node) => _node.locked),
      {
        id: node.id,
        componentName: componentName,
        locked: false,
        search: false,
      },
    ]);
  };

  const removeHighlight = (node) => {
    const index = highlightedComponents.findIndex(
      (component) => component.id === node.id
    );
    if (index !== -1) {
      const highlightedComponent = highlightedComponents[index];
      if (!highlightedComponent.locked) {
        const array = [...highlightedComponents];
        array.splice(index, 1);
        setHighlightedComponents(array);
      }
    }
  };

  const resetHighlight = () => setHighlightedComponents([]);

  // const isHighlighted = (node) => {
  //   return highlightedComponents.some((component) =>
  //     node.id.match(
  //       `${component.componentName}:+.+|${component.componentName}$`
  //     )
  //   );
  // };

  /**
   * Coloring the minimap nodes.
   * @param {*} node: Visual Representation of the component nodes
   * @returns {color} Red if it's highlighted, colorhash otherwise
   */
  // const defineMinimapColor = (node) => {
  //   if (isHighlighted(node)) {
  //     return 'red';
  //   } else {
  //     return new ColorHash({
  //       lightness: 0.8,
  //       hue: { min: 0, max: 366 },
  //     }).hex(node.data.label);
  //   }
  // };

  return (
    <>
      {nodesAndEdges && (
        <ReactFlowProvider>
          {/* https://reactflow.dev/docs/api/component-props/ */}
          <ReactFlow
            onLoad={onLoadTree}
            elements={nodesAndEdges}
            nodeTypes={{ reactComponent: ComponentNode }}
            onNodeMouseEnter={(_e, node) => highlightComponent(node, false)}
            onNodeMouseLeave={(_e, node) => removeHighlight(node)}
            onPaneClick={resetHighlight}
            panOnScroll={true}
            minZoom={0}
            defaultZoom={0}
          >
            {/* <StyledMiniMap nodeColor={defineMinimapColor} /> */}

            <ZoomControlButtons />
          </ReactFlow>
        </ReactFlowProvider>
      )}
    </>
  );
};

ComponentTree.propTypes = {
  nodesAndEdges: PropTypes.any,
  direction: PropTypes.any,
};

export default ComponentTree;
