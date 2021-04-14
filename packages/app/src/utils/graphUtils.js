import dagre from 'dagre';
import { isNode } from 'react-flow-renderer';

import { baseNodeHeight, nodeWidth } from '../styles/tokens/units';

export const getLayoutedElements = (elements, direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
  const aditionalSpaceMultiplier = 2;

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: nodeWidth * aditionalSpaceMultiplier,
        height: baseNodeHeight + el.data.linesOfCode,
      });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? 'left' : 'top';
      el.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // unfortunately we need this little hack to pass a slighltiy different position
      // to notify react flow about the change. More over we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x:
          nodeWithPosition.x -
          (nodeWidth * aditionalSpaceMultiplier) / 2 +
          Math.random() / 1000,
        y: nodeWithPosition.y - (36 + el.data.linesOfCode) / 2,
      };
    }

    return el;
  });
};
