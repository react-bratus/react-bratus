import React, { useContext, useEffect, useState } from 'react';
import { useStoreState, useZoomPanHelper } from 'react-flow-renderer';
import HighlightedComponentsContext from '../../../../contexts/HighlightedComponentsContext';
import {
  StyledDropDownSelect,
  TreeComponentDropdown,
} from '../../NavigationPanel.sc';

const NavSearchComponent = () => {
  const { setCenter } = useZoomPanHelper();

  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );

  const nodes = useStoreState((store) => store.nodes);

  const [searchField, setSearchField] = useState();
  const [searchOptions, setSearchOptions] = useState([]);

  const focusNode = (id) => {
    const index = nodes.findIndex((node) => node.id == id);
    const node = nodes[index];
    const x = node.__rf.position.x + node.__rf.width / 2;
    const y = node.__rf.position.y + node.__rf.height / 2;
    const zoom = 1;

    setCenter(x, y, zoom);
  };

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
  }, [nodes]);

  return (
    <TreeComponentDropdown
      showSearch
      value={searchField}
      dropdownStyle={StyledDropDownSelect}
      placeholder="Search components"
      onChange={onChange}
      treeDataSimpleMode
      treeDefaultExpandAll={false}
      treeData={searchOptions}
    />
  );
};

export default NavSearchComponent;
