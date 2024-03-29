import React, { useContext, useEffect, useState } from 'react';
import { useStoreState, useZoomPanHelper } from 'react-flow-renderer';
import HighlightedComponentsContext from '../../../../contexts/HighlightedComponentsContext';
import {
  StyledDropDownSelect,
  TreeComponentDropdown,
  SearchNodeExplanationText,
  ImportantKeyword,
} from '../../NavigationPanel.sc';
// import { InitialNodesContext } from '../../../../App';
import { focusSearchDropdown } from '../../../../utils/functions/focusSearchDropdown';

const NavSearchComponent = () => {
  const { setCenter } = useZoomPanHelper();

  // Preserving the initial nodes in memory.
  // const initialNodesContext = useContext(InitialNodesContext);

  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );

  // Get the nodes from the state.
  const nodes = useStoreState((store) => store.nodes);

  // Selected node in searchbar.
  const [searchField, setSearchField] = useState();

  // Setting the nodes that appear in the searchbar.
  const [searchOptions, setSearchOptions] = useState([]);

  // Focus navigation search bar on keypress for both Mac and Windows
  focusSearchDropdown();

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
    setSearchField(null);
  }, [nodes]);

  useEffect(() => {
    generateTreeNodes();
  }, [nodes]);

  return (
    <>
      <SearchNodeExplanationText>
        Selecting a node in the dropdown will{' '}
        <ImportantKeyword>center this node</ImportantKeyword> in your screen.
      </SearchNodeExplanationText>

      <TreeComponentDropdown
        showSearch
        value={searchField}
        id="search-component-dropdown"
        dropdownStyle={StyledDropDownSelect}
        placeholder="Select Node to focus"
        onChange={onChange}
        treeDataSimpleMode
        treeDefaultExpandAll={true}
        treeData={searchOptions}
      />
    </>
  );
};

export default NavSearchComponent;
