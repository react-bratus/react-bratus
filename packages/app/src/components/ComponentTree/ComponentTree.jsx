// import ColorHash from 'color-hash';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ReactFlow, { Controls as ZoomControlButtons } from 'react-flow-renderer';

// import StyledMiniMap from '../Minimap/Minimap.sc';
import HighlightedComponentsContext from '../../contexts/HighlightedComponentsContext';
import ComponentNode from '../ComponentNode/ComponentNode';

const ComponentTree = ({ elements }) => {
  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );

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
      {elements && (
        <ReactFlow
          elements={elements}
          nodeTypes={{ reactComponent: ComponentNode }}
          onNodeMouseEnter={(_e, node) => highlightComponent(node, false)}
          onNodeMouseLeave={(_e, node) => removeHighlight(node)}
          onPaneClick={resetHighlight}
        >
          {/* <StyledMiniMap nodeColor={defineMinimapColor} /> */}

          <ZoomControlButtons />
        </ReactFlow>
      )}
    </>
  );
};

ComponentTree.propTypes = {
  elements: PropTypes.any,
};

export default ComponentTree;
