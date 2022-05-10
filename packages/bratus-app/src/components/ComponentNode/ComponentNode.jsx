import { Modal, Divider, Button } from 'antd';
import ColorHash from 'color-hash';
import React, { useContext, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import ComponentBackgroundContext from '../../contexts/ComponentBackgroundContext';
import HighlightedComponentsContext from '../../contexts/HighlightedComponentsContext';
import {
  BackgroundLabels,
  GraphLabels,
  HandleLabels,
} from '../../utils/constants/constants';
import { nodeNameLength } from '../../utils/constants/units';
import { rgbaToHex } from '../../utils/functions/rgbaToHex';
import { GraphDirectionContext } from '../ComponentTree/ComponentTree';
import { StyledNode, StyledNodeContent, StyledTitle } from './ComponentNode.sc';

const ComponentNode = (node) => {
  const { highlightedComponents } = useContext(HighlightedComponentsContext);

  const { componentBackground } = useContext(ComponentBackgroundContext);

  // We need the layout to pass it as props to the styled component.
  const treeLayoutDirection = useContext(GraphDirectionContext);

  const isHighlighted = () => {
    return highlightedComponents.some((component) =>
      node.id.match(
        `${component.componentName}:+.+|${component.componentName}$`
      )
    );
  };

  // Getting the background of the node, depending on the background mode.
  const getBgColor = () => {
    if (componentBackground.mode === BackgroundLabels.size) {
      const hex = new ColorHash({
        lightness: 0.8,
        hue: { min: 0, max: 366 },
      }).hex(node.data.label);
      return hex;
    } else if (componentBackground.mode === BackgroundLabels.loc) {
      return rgbaToHex(
        `rgba(255,140,0,${
          node.data.linesOfCode / componentBackground.locReference > 1
            ? 1
            : node.data.linesOfCode / componentBackground.locReference
        })`
      );
    } else {
      return '#FFFFFFFF';
    }
  };

  // Getting the font color of the node, depending on the background color.
  const getFontColor = () => {
    const bgColor = getBgColor();
    const color =
      bgColor.charAt(0) === '#'
        ? bgColor.substring(bgColor.length === 9 ? 2 : 1, 7)
        : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000' : '#fff';
  };

  // Dynamically change the position of the handles depending on
  // the layout of the tree.
  const layoutTargetHandlePosition =
    treeLayoutDirection === GraphLabels.leftToRight
      ? HandleLabels.left
      : HandleLabels.top;

  const layoutSourceHandlePosition =
    treeLayoutDirection === GraphLabels.leftToRight
      ? HandleLabels.right
      : HandleLabels.bottom;

  // Display the 13 first chars of the node name, for those that are long.
  const truncateNodeName = (nodeName, nameLength) => {
    return nodeName.length > nameLength
      ? nodeName.slice(0, nameLength - 1).concat('...')
      : nodeName;
  };

  const content = (
    <div>
      <p>This component is used {node.data.component.timesUsed} times.</p>
      <Divider />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button type="primary" href={`vscode://file/${node.data.path}`}>
          Go To Code
        </Button>
        <Button
          onClick={() => {
            node.data.onShowNodeDetail(node);
          }}
          type="primary"
        >
          View Code
        </Button>
      </div>
    </div>
  );

  const truncatedNodeName = truncateNodeName(node.data.label, nodeNameLength);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    // <Popover
    //   visible={isPopoverVisible}
    //   title={node.data.label}
    //   trigger={'click'}
    //   content={content}
    //   onClick={() => setisPopoverVisible(true)}
    // >
    <StyledNode
      linesOfCode={node.data.linesOfCode}
      componentBackground={componentBackground}
      treeLayoutDirection={treeLayoutDirection}
      isHighlighted={isHighlighted()}
      bgColor={getBgColor}
      fontColor={getFontColor()}
      onClick={showModal}
    >
      {node.data.inDegree > 0 && (
        <Handle
          type={HandleLabels.target}
          position={layoutTargetHandlePosition}
        />
      )}

      <Modal
        title={node.data.label}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content}
      </Modal>

      <StyledNodeContent>
        <StyledTitle color={getFontColor} level={5}>
          {truncatedNodeName}
        </StyledTitle>
      </StyledNodeContent>

      {node.data.outDegree > 0 && (
        <Handle
          type={HandleLabels.source}
          position={layoutSourceHandlePosition}
        />
      )}
    </StyledNode>
    //</Popover>
  );
};

export default ComponentNode;
