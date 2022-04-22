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

  // EXPERIMENT FROM HERE
  console.log('Layouted Nodes and Edges:', layoutedNodesAndEdges);

  const [treeFilter, setTreeFilter] = useState(false);

  const nodes = layoutedNodesAndEdges.filter((obj) => {
    return obj.type == 'reactComponent';
  });

  const [filteredNodesAndEdges, setFilteredNodesAndEdges] = useState('App');

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

  console.log('Filtered:', filteredNodesAndEdges);
  const reactFlowInstance = useZoomPanHelper();

  // Selected node in searchbar.
  const [searchField, setSearchField] = useState();
  // Setting the nodes that appear in the searchbar.
  const [searchOptions, setSearchOptions] = useState([]);

  const onChange = (id) => {
    const index = nodes.findIndex((node) => node.id == id);
    const node = nodes[index];
    const label = node.data.label;
    filterByName(layoutedNodesAndEdges, label);
    setSearchField(label);
    setTimeout(() => reactFlowInstance.fitView(), 0);
  };
  // Node names are in form of Parent:Children.
  const getParentId = (id) => {
    const idSplit = id.split(':');
    if (idSplit.length == 1) {
      return null;
    }
    idSplit.pop();
    return idSplit.join(':');
  };

  // outDegree is 0 if the node has no descendants. Look at Graph.ts.
  const isLeaf = (node) => {
    return node.data.outDegree == 0;
  };
  // Returns a list of node objects, used in the TreeComponentDropdown.
  const generateTreeNodes = () => {
    if (nodes.length > 0) {
      setSearchOptions(
        nodes.map((node) => {
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
  }, [layoutedNodesAndEdges]); // deleted dependancy 'nodes'

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

  const renderElements = treeFilter
    ? filteredNodesAndEdges
    : layoutedNodesAndEdges;

  return (
    <>
      <label htmlFor="filter">
        ComponentTree filter:
        <input
          id="filter"
          type="checkbox"
          checked={treeFilter}
          onChange={() => {
            filterByName(layoutedNodesAndEdges, 'App');
            setTreeFilter(!treeFilter);
            setTimeout(() => reactFlowInstance.fitView(), 0);
          }}
        />
      </label>
      {renderElements && (
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
            onChange={onChange}
            treeDataSimpleMode
            treeDefaultExpandAll={true}
            treeData={searchOptions}
          />
          <ReactFlow
            onLoad={onLoadTree}
            elements={renderElements}
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
