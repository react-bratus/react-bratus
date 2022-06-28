import React, { useContext, useEffect, useState } from 'react';
import { useStoreState, useZoomPanHelper } from 'react-flow-renderer';
import PropTypes from 'prop-types';
import {
  StyledDropDownSelect,
  SubtreeSwitchWrapper,
  TreeComponentDropdown,
  SearchNodeExplanationText,
  SubtreeModeText,
  TimesUsedInputGroup,
  TimesUsedButton,
  ImportantKeyword,
  FilterSwitch,
} from '../../NavigationPanel.sc';
import { InitialNodesContext } from '../../../../App';
import { Input } from 'antd';
import { focusSearchDropdown } from '../../../../utils/functions/focusSearchDropdown';
import { RedoOutlined } from '@ant-design/icons';
import {
  ActionButton,
  RecompileActionsWrapper,
} from '../ActionButtons/ActionButtons.sc';
import { recompile } from '../../../../api';
import { ButtonLabels } from '../../../../utils/constants/constants';

const NavFilterComponent = ({
  isFilterMode,
  setIsFilterMode,
  setComponentLabelFilter,
  setComponentNumberFilter,
  setComponentNameFilter,
}) => {
  const { fitView } = useZoomPanHelper();

  // When toggling the switch, set the LabelFilter and the searchfield
  // to be the root of the initial nodes, so that we rerender the tree.
  const removeFilters = () => {
    setComponentLabelFilter(initialNodesContext[0].data.label);
    setSearchField(initialNodesContext[0].data.label);

    setTimeout(() => fitView({ duration: 500 }), 0);
  };

  // Toggling the switch
  const onFilterSwitchToggle = async () => {
    await setIsFilterMode(!isFilterMode);

    removeFilters();
  };

  // Preserving the initial nodes in memory.
  const initialNodesContext = useContext(InitialNodesContext);

  // Get the nodes from the state.
  const nodes = useStoreState((store) => store.nodes);

  // Selected node in searchbar.
  const [searchField, setSearchField] = useState();

  // Setting the nodes that appear in the searchbar.
  const [searchOptions, setSearchOptions] = useState([]);

  // State for the number input.
  const [numberForFilter, setNumberForFilter] = useState(undefined);

  // State for the component name for filtering.
  const [nameForFilter, setNameForFilter] = useState('');

  function handleNumberInputChange(e) {
    setNumberForFilter(e.target.value);
  }

  function handleNameInputChange(e) {
    setNameForFilter(e.target.value);
  }

  // Focus navigation search bar on keypress for both Mac and Windows
  focusSearchDropdown();

  const onChangeSubtreeRootNode = (id) => {
    const index = initialNodesContext.findIndex((node) => node.id == id);
    const node = initialNodesContext[index];
    const label = node.data.label;

    setSearchField(label);
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

  const triggerRecompile = () => {
    recompile()
      .then(location.reload())
      .catch((error) => console.log('An error occurred ', error));
  };

  return (
    <>
      <SubtreeSwitchWrapper>
        <SubtreeModeText>
          {!isFilterMode ? 'Enable Filter Mode to Continue' : 'Filter Mode On'}
        </SubtreeModeText>
        <FilterSwitch defaultChecked={false} onChange={onFilterSwitchToggle} />
      </SubtreeSwitchWrapper>

      {isFilterMode && (
        <SearchNodeExplanationText>
          Selecting a node will{' '}
          <ImportantKeyword>render a subtree</ImportantKeyword> with this node
          as the root.
        </SearchNodeExplanationText>
      )}

      {isFilterMode && (
        <>
          <TreeComponentDropdown
            showSearch
            id="search-component-dropdown"
            value={searchField}
            dropdownStyle={StyledDropDownSelect}
            placeholder="Define Subtree Root"
            onChange={onChangeSubtreeRootNode}
            treeDataSimpleMode
            treeDefaultExpandAll={true}
            treeData={searchOptions}
          />

          <SearchNodeExplanationText>
            Hide components used more times than:
          </SearchNodeExplanationText>

          <TimesUsedInputGroup compact>
            <Input type="number" onChange={handleNumberInputChange} />
            <TimesUsedButton
              onClick={() => {
                numberForFilter && setComponentNumberFilter(numberForFilter);
              }}
              type="primary"
            >
              Apply Filter
            </TimesUsedButton>
          </TimesUsedInputGroup>

          {/* Input field for the 'filter component by name' */}
          <SearchNodeExplanationText>
            Hide components by the specified name:
          </SearchNodeExplanationText>

          <TimesUsedInputGroup compact>
            <Input onChange={handleNameInputChange} />
            <TimesUsedButton
              onClick={() => {
                setComponentNameFilter(nameForFilter);
              }}
              type="primary"
            >
              Apply Filter
            </TimesUsedButton>
          </TimesUsedInputGroup>
          <RecompileActionsWrapper>
            <ActionButton
              type="primary"
              shape="round"
              size="middle"
              icon={<RedoOutlined />}
              onClick={triggerRecompile}
            >
              {ButtonLabels.filterReset}
            </ActionButton>
          </RecompileActionsWrapper>
        </>
      )}
    </>
  );
};

NavFilterComponent.propTypes = {
  nodesAndEdges: PropTypes.any,
  isFilterMode: PropTypes.bool,
  setIsFilterMode: PropTypes.func,
  setComponentLabelFilter: PropTypes.func,
  setComponentNumberFilter: PropTypes.func,
  setComponentNameFilter: PropTypes.func,
};

export default NavFilterComponent;
