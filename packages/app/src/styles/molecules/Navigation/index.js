import {
  Button,
  Input,
  Layout,
  Menu,
  message,
  Select,
  TreeSelect,
  Typography,
} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { useContext, useEffect, useState } from 'react';
import { useStoreState, useZoomPanHelper } from 'react-flow-renderer';
import styled from 'styled-components';

import { recompile } from '../../../api';
import ComponentBackgroundContext from '../../../contexts/ComponentBackgroundContext';
import HighlightedComponentsContext from '../../../contexts/HighlightedComponentsContext';
import { baseUnit, navigationWidth } from '../../tokens/units';
import NavigationSection from '../NavigationSection';
const { Title } = Typography;

const StyledTitle = styled(Title)`
  color: #fff !important;
  text-align: center;
`;

const InfoParagraph = styled(Paragraph)`
  color: #fff;
  line-height: ${baseUnit * 2}px;
  font-size: ${baseUnit + 2}px;
  text-align: right;
  padding: 0 ${baseUnit}px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  padding: ${baseUnit}px;
  margin-left: auto;
  width: 100%;

  > * {
    &:not(:last-child) {
      margin-left: ${baseUnit}px;
      margin-bottom: ${baseUnit}px;
    }
  }
`;

const { Sider } = Layout;

const Navigation = () => {
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

  const compile = () => {
    recompile()
      .then(() => {
        const hide = message.loading(
          'Recompiling. Window will refresh soon..',
          0
        );
        setTimeout(() => hide, 2000);
        setTimeout(() => {
          location.reload();
        }, 4000);
      })
      .catch((error) => console.log('An error occurred ', error));
  };

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
    <Sider
      width={navigationWidth}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <StyledTitle level={1}>react-bratus</StyledTitle>
      <Menu theme="dark" mode="inline">
        <NavigationSection title="Search">
          <TreeSelect
            showSearch
            style={{
              width: '100%',
              padding: `0 ${baseUnit}px`,
            }}
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
          <Actions>
            <Button onClick={compile} ghost>
              Recompile
            </Button>
            <Button
              target="_blank"
              href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=feedback&template=feedback.md&title=%5BFeedback%5D"
              ghost
            >
              Give feedback
            </Button>
            <Button
              target="_blank"
              href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D+"
              ghost
            >
              Submit bug
            </Button>
            <Button
              target="_blank"
              href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFeature%5D"
              ghost
            >
              Suggest new feature
            </Button>
          </Actions>
        </NavigationSection>
        <NavigationSection title="Component Background">
          <InfoParagraph>Determine how to colour the components.</InfoParagraph>
          <Select
            defaultValue={
              !componentBackground.mode ? 'white' : componentBackground.mode
            }
            style={{
              width: '100%',
              padding: `0 ${baseUnit}px`,
            }}
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
          </Select>

          {componentBackground.mode === 'loc_reference' && (
            <div
              style={{
                width: '100%',
                padding: `0 ${baseUnit}px`,
                marginTop: `${baseUnit}px`,
              }}
            >
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
            </div>
          )}
        </NavigationSection>
      </Menu>
    </Sider>
  );
};

export default Navigation;
