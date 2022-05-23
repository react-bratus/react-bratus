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
  isSubtreeMode,
  componentLabelFilter,
  componentNumberFilter,
  componentNameFilter,
  treeLayoutDirection,
  setTreeLayoutDirection,
}) => {
  const [layoutedNodesAndEdges, setLayoutedNodesAndEdges] =
    useState(nodesAndEdges);

  // Filter: Will run when the filter switch is toggled on/off.
  useEffect(() => {
    setFilteredNodesAndEdges(
      filterLeaveOnlyComponentsByName(layoutedNodesAndEdges, rootComponentLabel)
    );
    setTimeout(() => reactFlowInstance.fitView({ duration: 500 }), 0);
  }, [isSubtreeMode]);

  // Filter: Hides all components but the one specified by the chosen name and its subtree.
  useEffect(() => {
    setFilteredNodesAndEdges(
      filterLeaveOnlyComponentsByName(
        layoutedNodesAndEdges,
        componentLabelFilter
      )
    );
    setTimeout(() => reactFlowInstance.fitView({ duration: 500 }), 0);
  }, [componentLabelFilter]);

  // Filter: Hides componenets used more times than the given number (can't be lower then 1).
  useEffect(() => {
    const number = componentNumberFilter < 1 ? 1000 : componentNumberFilter;
    setFilteredNodesAndEdges(
      filterRemoveComponentsUsedMoreTimesThan(layoutedNodesAndEdges, number)
    );
    setTimeout(() => reactFlowInstance.fitView({ duration: 500 }), 0);
  }, [componentNumberFilter]);

  // Filter: Hides the component specified by the given name and its subtree.
  useEffect(() => {
    setFilteredNodesAndEdges(
      filterRemoveComponentsByName(filteredNodesAndEdges, componentNameFilter)
    );
    setTimeout(() => reactFlowInstance.fitView({ duration: 500 }), 0);
  }, [componentNameFilter]);

  const [filteredNodesAndEdges, setFilteredNodesAndEdges] = useState([]);

  // The first node of data is always the root component.
  const rootComponentLabel = layoutedNodesAndEdges
    ? layoutedNodesAndEdges[0]?.data?.label
    : 'App';

  const reactFlowInstance = useZoomPanHelper();

  /**
   * Filters the given array of nodes and edges and leaves only the ones associated with the given component name.
   * @param {*} incomingDataArray Array to filter.
   * @param {*} componentName Component name.
   */
  function filterLeaveOnlyComponentsByName(incomingDataArray, componentName) {
    const result = incomingDataArray.filter((obj) => {
      if (isNode(obj)) {
        return obj.id.split(':').includes(componentName);
      } else {
        return obj.source.split(':').includes(componentName);
      }
    });
    return result;
  }

  /**
   * Filters the given array of nodes and edges and removes component used more times than the given number.
   * @param {*} incomingDataArray Array to filter.
   * @param {*} number Number of times used.
   */
  function filterRemoveComponentsUsedMoreTimesThan(incomingDataArray, number) {
    const result = incomingDataArray.filter((obj) => {
      if (isNode(obj)) {
        return obj.data.component.timesUsed <= number;
      } else {
        return obj;
      }
    });
    return result;
  }

  /**
   * Filters the given array of nodes and edges and leaves only the ones associated with the given component name.
   * @param {*} incomingDataArray Array to filter.
   * @param {*} componentName Component name.
   */
  function filterRemoveComponentsByName(incomingDataArray, componentName) {
    const result = incomingDataArray.filter((obj) => {
      if (isNode(obj)) {
        return !obj.id.split(':').includes(componentName);
      } else {
        return !obj.source.split(':').includes(componentName);
      }
    });
    return result;
  }

  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );

  // Fit tree on the screen
  const onLoadTree = (reactFlowInstance) =>
    reactFlowInstance.fitView({ duration: 500 });

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

  console.log('Filtered:', filteredNodesAndEdges);

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
  componentNameFilter: PropTypes.any,
  setTreeLayoutDirection: PropTypes.any,
  isSubtreeMode: PropTypes.any,
};

export default ComponentTree;
