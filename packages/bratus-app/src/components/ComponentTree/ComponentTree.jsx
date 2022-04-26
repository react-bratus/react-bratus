import ReactFlow, { useZoomPanHelper } from 'react-flow-renderer';
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import HighlightedComponentsContext from '../../contexts/HighlightedComponentsContext';
import ComponentNode from '../ComponentNode/ComponentNode';
import LayoutButtons from './private/LayoutButtons';
import { ZoomControlButtons } from './ComponentTree.sc';
import {
  TreeComponentDropdown,
  StyledDropDownSelect,
} from '../NavigationPanel/NavigationPanel.sc';

// Create context to provide the tree layout direction to the children.
export const GraphDirectionContext = React.createContext(null);

const ComponentTree = ({
  nodesAndEdges,
  treeLayoutDirection,
  setTreeLayoutDirection,
}) => {
  const [layoutedNodesAndEdges, setLayoutedNodesAndEdges] =
    useState(nodesAndEdges);
  console.log('[State] layoutedNodesAndEdges:', layoutedNodesAndEdges);

  // FILTERING LOGIC:
  const [useFilter, setUseFilter] = useState(false);
  const [filteredNodesAndEdges, setFilteredNodesAndEdges] = useState([]);
  console.log('[State] filteredNodesAndEdges:', filteredNodesAndEdges);

  const nodesForDropdown = layoutedNodesAndEdges.filter((obj) => {
    return obj.type == 'reactComponent';
  });
  const firstRootComponentLabel = nodesForDropdown
    ? nodesForDropdown[0].data.label
    : 'undefined';

  const [searchField, setSearchField] = useState(firstRootComponentLabel);
  const [searchOptions, setSearchOptions] = useState([]);
  const reactFlowInstance = useZoomPanHelper();

  function filterByName(array, filterName) {
    const result = array.filter((obj) => {
      if (Object.hasOwn(obj, 'type')) {
        return obj.id.includes(filterName);
      } else {
        return obj.source.includes(filterName);
      }
    });
    setFilteredNodesAndEdges(result);
  }

  const onSelectNode = (id) => {
    const index = nodesForDropdown.findIndex((node) => node.id == id);
    const node = nodesForDropdown[index];
    const label = node.data.label;
    setSearchField(label);
    filterByName(layoutedNodesAndEdges, label);
    setTimeout(() => reactFlowInstance.fitView(), 0);
  };

  const getParentId = (id) => {
    const idSplit = id.split(':');
    if (idSplit.length == 1) {
      return null;
    }
    idSplit.pop();
    return idSplit.join(':');
  };

  const isLeaf = (node) => {
    return node.data.outDegree == 0;
  };

  const generateTreeNodes = () => {
    if (nodesForDropdown.length > 0) {
      setSearchOptions(
        nodesForDropdown.map((node) => {
          return {
            id: node.id,
            pId: getParentId(node.id),
            title: node.data.label,
            value: node.id,
            isLeaf: isLeaf(node),
          };
        })
      );
    }
  };

  useEffect(() => {
    generateTreeNodes();
  }, []);

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

  // const renderElements = useFilter
  //    filteredNodesAndEdges
  //   : layoutedNodesAndEdges;

  console.log('[Rendered] ComponentTree.jsx');

  return (
    <>
      <label htmlFor="filter">
        ComponentTree filter:
        <input
          id="filter"
          type="checkbox"
          checked={useFilter}
          onChange={() => {
            setUseFilter(!useFilter);
            filterByName(layoutedNodesAndEdges, searchField);
            setTimeout(() => reactFlowInstance.fitView(), 0);
          }}
        />
      </label>
      {layoutedNodesAndEdges && (
        <GraphDirectionContext.Provider value={treeLayoutDirection}>
          <LayoutButtons
            setTreeLayoutDirection={setTreeLayoutDirection}
            layoutedNodesAndEdges={layoutedNodesAndEdges}
            setLayoutedNodesAndEdges={setLayoutedNodesAndEdges}
          />
          <TreeComponentDropdown
            value={searchField}
            dropdownStyle={StyledDropDownSelect}
            placeholder="Chose component"
            onChange={onSelectNode}
            treeDataSimpleMode
            treeDefaultExpandAll={true}
            treeData={searchOptions}
          />
          <ReactFlow
            onLoad={onLoadTree}
            elements={useFilter ? filteredNodesAndEdges : layoutedNodesAndEdges}
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
  setTreeLayoutDirection: PropTypes.any,
};

export default ComponentTree;
