import { Input, Menu, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useStoreState, useZoomPanHelper } from 'react-flow-renderer';

import ComponentBackgroundContext from '../../contexts/ComponentBackgroundContext';
import HighlightedComponentsContext from '../../contexts/HighlightedComponentsContext';
import { navigationWidth } from '../../utils/tokens/units';
import {
  AppTitle,
  BaselineInputWrapper,
  ColorInfoParagraph,
  DropdownInput,
  HelpPanelButton,
  NavigationSider,
  TreeComponentDropdown,
} from './NavigationPanel.sc';
import PropTypes from 'prop-types';

import NavigationActionButtons from './private/NavigationActionButtons/NavigationActionButtons';
import NavigationSection from './private/NavigationSection/NavigationSection';
import { QuestionCircleOutlined } from '@ant-design/icons';

const NavigationPanel = ({ collapsed, setIsHelpVisible }) => {
  const [searchField, setSearchField] = useState();
  const [searchOptions, setSearchOptions] = useState([]);
  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );
  const { componentBackground, setComponentBackground } = useContext(
    ComponentBackgroundContext
  );
  const nodes = useStoreState((store) => store.nodes);
  const { setCenter } = useZoomPanHelper();

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

  useEffect(() => {
    generateTreeNodes();
  }, [nodes]);

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

  return (
    <>
      <NavigationSider
        collapsed={collapsed}
        collapsedWidth={0}
        width={navigationWidth}
      >
        <AppTitle level={1}>React-bratus</AppTitle>

        <Menu theme="dark" mode="inline">
          <NavigationSection title="Search">
            <TreeComponentDropdown
              showSearch
              value={searchField}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Search components"
              onChange={onChange}
              treeDataSimpleMode
              treeDefaultExpandAll={false}
              treeData={searchOptions}
            />
          </NavigationSection>

          <NavigationSection title="Actions">
            <NavigationActionButtons />
          </NavigationSection>

          <NavigationSection title="Component Background">
            <ColorInfoParagraph>
              Determine how to colour the components.
            </ColorInfoParagraph>

            <DropdownInput
              defaultValue={
                !componentBackground.mode ? 'white' : componentBackground.mode
              }
              onChange={(value) =>
                setComponentBackground({ ...componentBackground, mode: value })
              }
            >
              <Select.Option value="white">White</Select.Option>

              <Select.Option value="label_hash">
                Based on Label Hash
              </Select.Option>

              <Select.Option value="loc_reference">
                Based on Lines of Code
              </Select.Option>
            </DropdownInput>

            {componentBackground.mode === 'loc_reference' && (
              <BaselineInputWrapper>
                <Input
                  addonBefore={'Baseline'}
                  placeholder={'LOC Reference'}
                  defaultValue={componentBackground.locReference}
                  onChange={(e) => {
                    if (e.target.value < 1) {
                      setComponentBackground({
                        ...componentBackground,
                        locReference: 1,
                      });
                    } else {
                      setComponentBackground({
                        ...componentBackground,
                        locReference: e.target.value,
                      });
                    }
                  }}
                  type="number"
                  min="1"
                />
              </BaselineInputWrapper>
            )}

            <HelpPanelButton
              type="primary"
              shape={'round'}
              size="large"
              icon={<QuestionCircleOutlined />}
              onClick={() => setIsHelpVisible(true)}
            >
              Open help
            </HelpPanelButton>
          </NavigationSection>
        </Menu>
      </NavigationSider>
    </>
  );
};

NavigationPanel.propTypes = {
  collapsed: PropTypes.any,
  setIsHelpVisible: PropTypes.any,
};

export default NavigationPanel;
