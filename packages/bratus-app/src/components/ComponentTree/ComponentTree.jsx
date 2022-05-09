import ReactFlow, { isNode, useZoomPanHelper } from 'react-flow-renderer';
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import HighlightedComponentsContext from '../../contexts/HighlightedComponentsContext';
import ComponentNode from '../ComponentNode/ComponentNode';
import LayoutButtons from './private/LayoutButtons';
import { ZoomControlButtons } from './ComponentTree.sc';

// Create context to provide the tree layout direction to the children.
export const GraphDirectionContext = React.createContext(null);

const ComponentTree = ({
  nodesAndEdges,
  componentLabelFilter,
  componentNumberFilter,
  treeLayoutDirection,
  setTreeLayoutDirection,
  isSubtreeMode,
}) => {
  const [layoutedNodesAndEdges, setLayoutedNodesAndEdges] =
    useState(nodesAndEdges);

  // Will run when the component is mounted.
  useEffect(() => {
    filterByName(layoutedNodesAndEdges, rootComponentLabel);
    setTimeout(() => reactFlowInstance.fitView({ duration: 500 }), 0);
  }, []);

  // Will run every time any of the componentFilter(s) change.
  useEffect(() => {
    filterByName(layoutedNodesAndEdges, componentLabelFilter);
    setTimeout(() => reactFlowInstance.fitView({ duration: 500 }), 0);
  }, [componentLabelFilter]);

  useEffect(() => {
    if (filteredNodesAndEdges) {
      setFilteredNodesAndEdges(
        filterByTimesUsed(filteredNodesAndEdges, componentNumberFilter)
      );
      setTimeout(() => reactFlowInstance.fitView({ duration: 500 }), 0);
      console.log(
        'componentNumberFilter in useEffect: ',
        componentNumberFilter
      );
    }
  }, [componentNumberFilter]);

  // MAYBE SPLIT useEffect() ! ! !

  // Filtering logic:

  const [filteredNodesAndEdges, setFilteredNodesAndEdges] = useState(null);

  // The first node of data is always the root component.
  const rootComponentLabel = layoutedNodesAndEdges
    ? layoutedNodesAndEdges[0]?.data?.label
    : 'App';

  const reactFlowInstance = useZoomPanHelper();

  /**
   * Sets filtered nodes and edges to display.
   * @param {*} array
   * @param {*} filterName
   */
  function filterByName(array, filterName) {
    const result = array.filter((obj) => {
      if (isNode(obj)) {
        return obj.id.includes(filterName);
      } else {
        return obj.source.includes(filterName);
      }
    });
    setFilteredNodesAndEdges(result);
  }

  function filterByTimesUsed(array, number) {
    const result = array.filter((obj) => {
      if (isNode(obj)) {
        return obj.data.component.timesUsed <= number;
      } else {
        return obj;
      }
    });
    return result;
    // setFilteredNodesAndEdges(result);
  }

  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );

  // Fit tree on the screen
  const onLoadTree = (reactFlowInstance) => reactFlowInstance.fitView();

  // Highlight nodes on hover
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

  // Stop highlighting
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

  // Reset highlightComponents (Empty array).
  const resetHighlight = () => setHighlightedComponents([]);

  // Conditionally passing nodes and edges to the onChangeTreeLayout, so that we can
  // change the positioning dynamically based on the direction of the tree.
  const renderedElementsToPosition =
    filteredNodesAndEdges && isSubtreeMode === true
      ? filteredNodesAndEdges
      : layoutedNodesAndEdges;

  // setting the fresh layouted elements, KiKi GangGang
  const setRenderedElementsToPosition =
    filteredNodesAndEdges && isSubtreeMode === true
      ? setFilteredNodesAndEdges
      : setLayoutedNodesAndEdges;

  return (
    <>
      {layoutedNodesAndEdges && (
        <GraphDirectionContext.Provider value={treeLayoutDirection}>
          <LayoutButtons
            setTreeLayoutDirection={setTreeLayoutDirection}
            layoutedNodesAndEdges={renderedElementsToPosition}
            setLayoutedNodesAndEdges={setRenderedElementsToPosition}
          />

          <ReactFlow
            onLoad={onLoadTree}
            elements={
              isSubtreeMode ? filteredNodesAndEdges : layoutedNodesAndEdges
            }
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
        </GraphDirectionContext.Provider>
      )}
    </>
  );
};

ComponentTree.propTypes = {
  nodesAndEdges: PropTypes.any,
  treeLayoutDirection: PropTypes.any,
  componentLabelFilter: PropTypes.any,
  componentNumberFilter: PropTypes.any,
  setTreeLayoutDirection: PropTypes.any,
  isSubtreeMode: PropTypes.any,
};

export default ComponentTree;
