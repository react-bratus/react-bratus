import {
  EyeOutlined,
  LockOutlined,
  NumberOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import ColorHash from 'color-hash';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Handle, useStoreActions, useStoreState } from 'react-flow-renderer';
import styled from 'styled-components';

import HighlightedComponentsContext from '../../../contexts/HighlightedComponentsContext';
import {
  baseNodeHeight,
  baseUnit,
  borderRadius,
  nodeWidth,
} from '../../tokens/units';
const StyledNode = styled.div`
  height: ${({ linesOfCode }) => baseNodeHeight + linesOfCode}px;
  width: ${nodeWidth}px;
  padding: ${baseUnit}px;
  border-radius: ${borderRadius}px;
  border: ${({ isHighlighted, locked }) => {
    if (!isHighlighted) {
      return '1px solid black';
    } else {
      return locked ? '3px solid black' : '3px dotted red';
    }
  }};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
`;

const NodeContent = styled(Col)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ComponentNode = ({ id, data }) => {
  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );
  const nodes = useStoreState((store) => store.nodes);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  const lockComponent = () => {
    const index = highlightedComponents.findIndex(
      (component) => component.id === id
    );
    const array = [...highlightedComponents];
    if (index !== -1 && highlightedComponents[index].locked) {
      array.splice(index, 1);
      setHighlightedComponents(array);
    } else if (index !== -1) {
      array.splice(index, 1);
      setHighlightedComponents([
        ...array,
        {
          id: id,
          componentName: data.label,
          locked: true,
          search: false,
        },
      ]);
      setSelectedElements(nodes.filter((_node) => _node.id.includes(id)));
    }
  };
  const isHighlighted = () => {
    return highlightedComponents.some((component) =>
      id.match(`${component.componentName}:+.+|${component.componentName}$`)
    );
  };
  const isLocked = () => {
    return highlightedComponents.some(
      (component) =>
        component.locked &&
        id.match(`${component.componentName}:+.+|${component.componentName}$`)
    );
  };

  const getBgColor = () => {
    return isLocked()
      ? '#FF6666	'
      : new ColorHash({ lightness: 0.8, hue: { min: 0, max: 366 } }).hex(
          data.label
        );
  };
  const getFontColor = () => {
    const bgColor = getBgColor();
    const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000' : '#fff';
  };
  return (
    <StyledNode
      linesOfCode={data.linesOfCode}
      isHighlighted={isHighlighted()}
      isLocked={isLocked()}
      bgColor={getBgColor}
      fontColor={getFontColor()}
    >
      {data.inDegree > 0 && <Handle type="target" position="left" />}
      <NodeContent>
        <Row>
          <Title style={{ color: getFontColor() }} level={5}>
            {data.label}
          </Title>
        </Row>
        <Row style={{ flexGrow: 1, paddingTop: '12px' }} justify="center">
          {data.component.timesUsed > 1 && (
            <>
              <NumberOutlined
                style={{ fontSize: '24px', color: getFontColor() }}
              />
              <Text
                style={{
                  fontSize: '24px',
                  lineHeight: '24px',
                  color: getFontColor(),
                }}
              >
                used: {data.component.timesUsed}
              </Text>
            </>
          )}
        </Row>
        {isHighlighted() && (
          <Row align="middle" justify="space-between">
            {isLocked() ? (
              <LockOutlined
                onClick={lockComponent}
                style={{ fontSize: '24px', cursor: 'pointer' }}
              />
            ) : (
              <UnlockOutlined
                onClick={lockComponent}
                style={{ fontSize: '24px', cursor: 'pointer' }}
              />
            )}
            <EyeOutlined
              onClick={() => data.onShowNodeDetail({ id: id, data: data })}
              style={{ fontSize: '24px', cursor: 'pointer' }}
            />
          </Row>
        )}
      </NodeContent>

      {data.outDegree > 0 && <Handle type="source" position="right" />}
    </StyledNode>
  );
};

ComponentNode.propTypes = {
  id: PropTypes.string,
  data: PropTypes.any,
};

export default ComponentNode;
