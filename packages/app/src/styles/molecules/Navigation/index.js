import { Button, Layout, Menu, message, TreeSelect, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useStoreState } from 'react-flow-renderer';
import styled from 'styled-components';

import { recompile } from '../../../api';
import { baseUnit, navigationWidth } from '../../tokens/units';
import NavigationSection from '../NavigationSection';
const { Paragraph, Title } = Typography;

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

const HighLightedNumber = styled.span`
  color: ${({ theme }) => theme.primary};
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

const Navigation = ({ info }) => {
  const [searchField, setSearchField] = useState({ value: undefined });
  const nodes = useStoreState((store) => store.nodes);

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

  const onChange = (value) => {
    setSearchField({ value });
  };

  useEffect(() => console.log(nodes));

  const getParentId = (id) => {
    const idSplit = id.split(':');
    if (idSplit.length == 1) {
      return null;
    }
    idSplit.pop();
    return idSplit[idSplit.length - 1];
  };
  const isLeaf = (node) => {
    return node.data.outDegree == 0;
  };
  const generateTreeNodes = () => {
    if (nodes.length > 0) {
      return nodes.map((node) => {
        return {
          id: node.data.label,
          pid: getParentId(node.id),
          title: node.data.label,
          value: node.id,
          isLeaf: isLeaf(node),
        };
      });
    }
    return [];
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
            value={searchField.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Search components"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChange}
            treeData={generateTreeNodes()}
          />
          {/* <TreeNode value="parent 1" title="parent 1">
              <TreeNode value="parent 1-0" title="parent 1-0">
                <TreeNode value="leaf1" title="my leaf" />
                <TreeNode value="leaf2" title="your leaf" />
              </TreeNode>
              <TreeNode value="parent 1-1" title="parent 1-1">
                <TreeNode
                  value="sss"
                  title={<b style={{ color: '#08c' }}>sss</b>}
                />
              </TreeNode>
            </TreeNode> 
          </TreeSelect>*/}
        </NavigationSection>
        <NavigationSection title="Filters">
          <InfoParagraph>No filters have been added</InfoParagraph>
        </NavigationSection>
        {info && (
          <NavigationSection title="Info">
            <InfoParagraph>
              your tree contains{' '}
              <HighLightedNumber>{info.uniqueComponents} </HighLightedNumber>
              unique components
            </InfoParagraph>
            <InfoParagraph>
              your components are on average reused
              <HighLightedNumber>
                {' '}
                {info.averageTimesUsed.toFixed(2)}{' '}
              </HighLightedNumber>
              times
            </InfoParagraph>
            <InfoParagraph>
              your average component consist of
              <HighLightedNumber>
                {' '}
                {info.averageLinesOfCode.toFixed(0)}{' '}
              </HighLightedNumber>
              lines of code
            </InfoParagraph>
          </NavigationSection>
        )}
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
        <NavigationSection title="Controls">
          <InfoParagraph>
            hover components with your mouse to highlight
          </InfoParagraph>
          <InfoParagraph>click a component to lock the highlight</InfoParagraph>
        </NavigationSection>
      </Menu>
    </Sider>
  );
};
Navigation.propTypes = {
  info: PropTypes.any,
};

export default Navigation;
