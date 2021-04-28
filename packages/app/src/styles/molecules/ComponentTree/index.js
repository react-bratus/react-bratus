import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ReactFlow, {
  Controls,
  useStoreActions,
  useStoreState,
} from 'react-flow-renderer';

import HighlightedComponentsContext from '../../../contexts/HighlightedComponentsContext';
import ComponentNode from '../../atoms/ComponentNode';
import MiniMap from '../../atoms/MiniMap';

const ComponentTree = ({ elements }) => {
  const { highlightedComponent, setHighlightedComponent } = useContext(
    HighlightedComponentsContext
  );
  const nodes = useStoreState((store) => store.nodes);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  const highlightComponent = (node, lock) => {
    const componentName = node ? node.data.label : null;
    if (lock) {
      setHighlightedComponent({
        componentName: componentName,
        locked: lock,
      });
      setSelectedElements(nodes.filter((_node) => _node.id.includes(node.id)));
    } else if (!highlightedComponent.locked) {
      setHighlightedComponent({
        componentName: componentName,
        locked: highlightedComponent.locked,
      });
    }
  };

  const resetHighlight = () => {
    if (!highlightedComponent.locked) {
      setHighlightedComponent({ componentName: null, locked: false });
    }
  };
  return (
    <>
      {elements && (
        <ReactFlow
          elements={elements}
          nodeTypes={{ reactComponent: ComponentNode }}
          onNodeMouseEnter={(_e, node) => highlightComponent(node, false)}
          onNodeMouseLeave={resetHighlight}
          onElementClick={(_e, node) => highlightComponent(node, true)}
          onPaneClick={() =>
            setHighlightedComponent({ componentName: null, locked: false })
          }
        >
          <MiniMap
            nodeColor={(node) => {
              if (
                highlightedComponent.componentName &&
                node.id.match(
                  `${highlightedComponent.componentName}:+.+|${highlightedComponent.componentName}$`
                )
              ) {
                return 'red';
              } else {
                return 'black';
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
