import ColorHash from 'color-hash';
import React, { useContext } from 'react';
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
  // const nodes = useStoreState((store) => store.nodes);

  const { componentBackground } = useContext(ComponentBackgroundContext);

  // const setSelectedElements = useStoreActions(
  //   (actions) => actions.setSelectedElements
  // );

  const treeLayoutDirection = useContext(GraphDirectionContext);

  // const lockComponent = () => {
  //   const index = highlightedComponents.findIndex(
  //     (component) => component.id === node.id
  //   );

  //   const array = [...highlightedComponents];
  //   if (index !== -1 && highlightedComponents[index].locked) {
  //     array.splice(index, 1);
  //     setHighlightedComponents(array);
  //   } else if (index !== -1) {
  //     array.splice(index, 1);
  //     setHighlightedComponents([
  //       ...array,
  //       {
  //         id: node.id,
  //         componentName: node.data.label,
  //         locked: true,
  //         search: false,
  //       },
  //     ]);
  //     setSelectedElements(nodes.filter((_node) => _node.id.includes(node.id)));
  //   }
  // };

  const isHighlighted = () => {
    return highlightedComponents.some((component) =>
      node.id.match(
        `${component.componentName}:+.+|${component.componentName}$`
      )
    );
  };

  // const isLocked = () => {
  //   return highlightedComponents.some(
  //     (component) =>
  //       component.locked &&
  //       node.id.match(
  //         `${component.componentName}:+.+|${component.componentName}$`
  //       )
  //   );
  // };

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

  const layoutTargetHandlePosition =
    treeLayoutDirection === GraphLabels.leftToRight
      ? HandleLabels.left
      : HandleLabels.top;

  const layoutSourceHandlePosition =
    treeLayoutDirection === GraphLabels.leftToRight
      ? HandleLabels.right
      : HandleLabels.bottom;

  const truncateNodeName = (nodeName, nameLength) => {
    return nodeName.length > nameLength
      ? nodeName.slice(0, nameLength - 1).concat('...')
      : nodeName;
  };

  const truncatedNodeName = truncateNodeName(node.data.label, nodeNameLength);

  return (
    <StyledNode
      linesOfCode={node.data.linesOfCode}
      componentBackground={componentBackground}
      treeLayoutDirection={treeLayoutDirection}
      isHighlighted={isHighlighted()}
      bgColor={getBgColor}
      fontColor={getFontColor()}
      onDoubleClick={() => node.data.onShowNodeDetail(node)}
    >
      {node.data.inDegree > 0 && (
        <Handle
          type={HandleLabels.target}
          position={layoutTargetHandlePosition}
        />
      )}

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
  );
};

export default ComponentNode;
