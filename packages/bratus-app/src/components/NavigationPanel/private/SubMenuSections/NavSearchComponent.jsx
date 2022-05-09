import React, { useContext, useEffect, useState } from 'react';
import { useStoreState, useZoomPanHelper } from 'react-flow-renderer';
import HighlightedComponentsContext from '../../../../contexts/HighlightedComponentsContext';
import PropTypes from 'prop-types';

import {
  SearchNodeExplanation,
  StyledDropDownSelect,
  SubtreeSwitchWrapper,
  TreeComponentDropdown,
} from '../../NavigationPanel.sc';
import { InitialNodesContext } from '../../../../App';
import { Switch } from 'antd';

const NavSearchComponent = ({
  setComponentLabelFilter,
  isSubtreeMode,
  setIsSubtreeMode,
}) => {
  const { setCenter, fitView } = useZoomPanHelper();

  const onTreeInteractionModeChange = () => {
    setIsSubtreeMode(!isSubtreeMode);
    setTimeout(() => fitView({ duration: 500 }), 0);
  };

  // Preserving the initial nodes in memory.
  const initialNodesContext = useContext(InitialNodesContext);

  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );

  // Get the nodes from the state.
  const nodes = useStoreState((store) => store.nodes);

  // Selected node in searchbar.
  const [searchField, setSearchField] = useState();

  // Setting the nodes that appear in the searchbar.
  const [searchOptions, setSearchOptions] = useState([]);

  // Bring selected node in the center of the screen.
  const focusNode = (id) => {
    const index = nodes.findIndex((node) => node.id == id);
    const node = nodes[index];
    const x = node.__rf.position.x + node.__rf.width / 2;
    const y = node.__rf.position.y + node.__rf.height / 2;
    const zoom = 1;

    // functionality from useZoomPanHelper()
    setCenter(x, y, zoom);
  };

  // Sets the in searchbar selected node. Finds the name of the component,
  // highlights its subtree and focuses its root.
  const onChange = (value) => {
    setSearchField(value);
    const arr = value.split(':');
    const componentName = arr[arr.length - 1];
    const index = highlightedComponents.findIndex(
      (component) => component.id === value
    );
    const array = [...highlightedComponents];
    array.splice(index, 1);
    setHighlightedComponents([
      {
        id: value,
        componentName: componentName,
        locked: true,
        search: false,
      },
    ]);
    focusNode(value);
  };

  const onChangeSubtreeRootNode = (id) => {
    const index = initialNodesContext.findIndex((node) => node.id == id);
    const node = initialNodesContext[index];
    const label = node.data.label;
    setComponentLabelFilter(label);
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
    if (initialNodesContext.length > 0) {
      setSearchOptions(
        initialNodesContext.map((node) => {
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
  }, [nodes]);

  return (
    <>
      <SubtreeSwitchWrapper>
        <Switch defaultChecked={false} onChange={onTreeInteractionModeChange} />
        <text>Subtree Mode</text>
      </SubtreeSwitchWrapper>

      <SearchNodeExplanation>
        {isSubtreeMode
          ? 'Selecting a node will render a subtree with this node as the root.'
          : 'Selecting a node in the dropdown will center this node in your screen.'}
      </SearchNodeExplanation>

      {isSubtreeMode === true ? (
        <TreeComponentDropdown
          showSearch
          value={searchField}
          dropdownStyle={StyledDropDownSelect}
          placeholder="Define Subtree Root"
          onChange={onChangeSubtreeRootNode}
          treeDataSimpleMode
          treeDefaultExpandAll={true}
          treeData={searchOptions}
        />
      ) : (
        <TreeComponentDropdown
          showSearch
          value={searchField}
          dropdownStyle={StyledDropDownSelect}
          placeholder="Select Node to focus"
          onChange={onChange}
          treeDataSimpleMode
          treeDefaultExpandAll={true}
          treeData={searchOptions}
        />
      )}
    </>
  );
};

NavSearchComponent.propTypes = {
  setComponentLabelFilter: PropTypes.func,
  nodesAndEdges: PropTypes.any,
  isSubtreeMode: PropTypes.bool,
  setIsSubtreeMode: PropTypes.func,
};

export default NavSearchComponent;
