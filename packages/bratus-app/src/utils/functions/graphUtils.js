import dagre from 'dagre';
import { isEdge, isNode } from 'react-flow-renderer';

import { GraphLabels } from '../tokens/constants';
import { baseNodeHeight, nodeWidth } from '../tokens/units';

var aditionalSpaceMultiplier = 2;

/**
 * @param {*} nodesAndEdges are the elements that we need to position
 * @param {*} dagreGraph is the graph that we retrieve
 * @var width is the horizontal spacing between the nodes
 * @var height is the vertical spacing between the nodes
 * @returns
 */
const positionElements = (nodesAndEdges, dagreGraph, direction) => {
  return nodesAndEdges.forEach((el) => {
    if (isNode(el)) {
      if (direction === GraphLabels.topToBottom) {
        dagreGraph.setNode(el.id, {
          width: nodeWidth,
          height: baseNodeHeight * aditionalSpaceMultiplier,
        });
      }

      if (direction == GraphLabels.leftToRight) {
        dagreGraph.setNode(el.id, {
          width: nodeWidth * aditionalSpaceMultiplier,
          height: baseNodeHeight,
        });
      }
    }

    if (isEdge(el)) {
      dagreGraph.setEdge(el.source, el.target);
    }
  });
};

export const getGraph = () => {
  const dagreGraph = new dagre.graphlib.Graph(); // building the graph
  return dagreGraph;
};

/**
 * @param {*} nodesAndEdges the nodes and edges of the tree.
 * @param {*} direction The scaling direction of the tree. Read more here: https://g6.antv.vision/en/docs/api/graphLayout/dagre
 * @function setDefaultEdgeLabel Default to assigning a new object as a label for each new edge.
 * @function setGraph Sets an object for the graph label
 * @function el.position Stephan: Unfortunately we need this little hack to pass a slighltiy different position to notify react flow about the change. More over we are shifting the dagre node position (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
 * @returns the node elements.
 */
export const getLayoutedElements = (nodesAndEdges, direction, setDirection) => {
  const dagreGraph = getGraph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  positionElements(nodesAndEdges, dagreGraph, direction);

  dagre.layout(dagreGraph);

  // not sure if we need this thingy here
  setDirection(direction);

  return nodesAndEdges.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      // Vertical Layout
      if (direction == GraphLabels.leftToRight) {
        el.position = {
          x:
            nodeWithPosition.x -
            (nodeWidth * aditionalSpaceMultiplier) / 2 +
            Math.random() / 1000,
          y: nodeWithPosition.y - 36 / 2,
        };
      }

      // Horizontal Layout
      if (direction == GraphLabels.topToBottom) {
        el.position = {
          x:
            nodeWithPosition.x -
            (nodeWidth * aditionalSpaceMultiplier) / 2 +
            Math.random() / 1000,
          y: nodeWithPosition.y - 36 / 2,
        };
      }
    }

    return el;
  });
};
