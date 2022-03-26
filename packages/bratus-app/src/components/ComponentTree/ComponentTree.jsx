import ReactFlow, {
  Controls as ZoomControlButtons,
  ReactFlowProvider,
  addEdge,
} from 'react-flow-renderer';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import HighlightedComponentsContext from '../../contexts/HighlightedComponentsContext';
import ComponentNode from '../ComponentNode/ComponentNode';
// import { getLayoutedGraphElements } from '../../utils/functions/graphUtils';
// import {
//   LayoutButton,
//   LayoutButtonsWrapper,
//   StyledFontAwesomeIcon,
// } from './ComponentTree.sc';
// import {
//   faGripHorizontal,
//   faGripVertical,
// } from '@fortawesome/free-solid-svg-icons';
import LayoutButtons from './private/LayoutButtons';

export const GraphDirectionContext = React.createContext(null);

const ComponentTree = ({
  nodesAndEdges,
  treeLayoutDirection,
  setTreeLayoutDirection,
}) => {
  const [elements, setElements] = useState(nodesAndEdges);

  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );

  const onConnectElements = (params) => {
    setElements((elements) => addEdge({ ...params }, elements));
  };

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

  return (
    <>
      {nodesAndEdges && (
        <GraphDirectionContext.Provider value={treeLayoutDirection}>
          <ReactFlowProvider>
            <LayoutButtons
              setTreeLayoutDirection={setTreeLayoutDirection}
              elements={elements}
              setElements={setElements}
              onLoadtree={onLoadTree}
            />
            <ReactFlow
              onLoad={onLoadTree}
              elements={elements}
              onConnect={onConnectElements}
              nodeTypes={{ reactComponent: ComponentNode }}
              onNodeMouseEnter={(_e, node) => highlightComponent(node, false)}
              onNodeMouseLeave={(_e, node) => removeHighlight(node)}
              onPaneClick={resetHighlight}
              panOnScroll={true}
              minZoom={0}
              defaultZoom={0}
            >
              <ZoomControlButtons />
            </ReactFlow>
          </ReactFlowProvider>
        </GraphDirectionContext.Provider>
      )}
    </>
  );
};

ComponentTree.propTypes = {
  nodesAndEdges: PropTypes.any,
  treeLayoutDirection: PropTypes.any,
  setTreeLayoutDirection: PropTypes.any,
};

export default ComponentTree;
