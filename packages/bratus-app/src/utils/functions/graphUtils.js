import dagre from 'dagre';
import { isNode } from 'react-flow-renderer';

import { baseNodeHeight, nodeWidth } from '../tokens/units';

/**
 *
 * @param {*} elements
 * @param {*} direction The general orientation of the tree hierarchy. LR means that the tree will expand horizontally from Left to Right. Read more here: https://g6.antv.vision/en/docs/api/graphLayout/dagre
 * @returns
 */
export const getLayoutedElements = (elements, direction = 'LR') => {
  // building the graph
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  // boolean condition to identify if it's really horizontal.
  const isHorizontal = direction === 'LR';
  // align DL was here. Remember to test it again.
  // Graph is created with a horizontal direction.
  dagreGraph.setGraph({ rankdir: direction });
  const aditionalSpaceMultiplier = 2;

  console.log('elements', elements);
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
      console.log(isHorizontal);
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
