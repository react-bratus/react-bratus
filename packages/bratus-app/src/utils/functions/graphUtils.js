import dagre from 'dagre';
import { isEdge, isNode } from 'react-flow-renderer';
import { GraphLabels } from '../tokens/constants';
import { baseNodeHeight, nodeWidth } from '../tokens/units';

var aditionalSpaceMultiplier = 2;

const dagreGraph = new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(() => ({}));

/**
 * @param {*} nodesAndEdges the nodes and edges of the tree.
 * @param {*} treeLayoutDirection The layout direction of the tree. Read more here: https://g6.antv.vision/en/docs/api/graphLayout/dagre. It is set to a value, as this is the way JS understands optional params.
 * @param {*} setTreeLayoutDirection Setting the direction state, to use it for handles positioning
 * @function setDefaultEdgeLabel Default to assigning a new object as a label for each new edge.
 * @function setGraph Sets an object for the graph label
 * @function el.position Stephan: Unfortunately we need this little hack to pass a slighltiy different position to notify react flow about the change. More over we are shifting the dagre node position (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
 * @returns the node elements.
 */
export const getLayoutedGraphElements = (
  nodesAndEdges,
  treeLayoutDirection = 'TB',
  setTreeLayoutDirection = () => {},
  componentBackground
) => {
  dagreGraph.setGraph({ rankdir: treeLayoutDirection });

  const isHorizontalLayout = treeLayoutDirection === 'LR';

  nodesAndEdges.forEach((graphElement) => {
    if (isNode(graphElement)) {
      if (treeLayoutDirection === GraphLabels.topToBottom) {
        if (componentBackground.mode === 'proportional_size') {
          dagreGraph.setNode(graphElement.id, {
            width: nodeWidth,
            height:
              baseNodeHeight * aditionalSpaceMultiplier +
              graphElement.data.linesOfCode,
          });
        } else {
          dagreGraph.setNode(graphElement.id, {
            width: nodeWidth,
            height: baseNodeHeight * 2.5,
          });
        }
      }

      if (treeLayoutDirection == GraphLabels.leftToRight) {
        if (componentBackground.mode === 'proportional_size') {
          dagreGraph.setNode(graphElement.id, {
            width: nodeWidth * aditionalSpaceMultiplier,
            height: baseNodeHeight + graphElement.data.linesOfCode,
          });
        }
        dagreGraph.setNode(graphElement.id, {
          width: nodeWidth * 2.5,
          height: baseNodeHeight,
        });
      }
    }

    if (isEdge(graphElement)) {
      dagreGraph.setEdge(graphElement.source, graphElement.target);
    }
  });

  dagre.layout(dagreGraph);

  setTreeLayoutDirection(treeLayoutDirection);

  return nodesAndEdges.map((graphElement) => {
    if (isNode(graphElement)) {
      const nodeWithPosition = dagreGraph.node(graphElement.id);

      graphElement.targetPosition = isHorizontalLayout ? 'left' : 'top';
      graphElement.sourcePosition = isHorizontalLayout ? 'right' : 'bottom';

      if (treeLayoutDirection === 'TB') {
        if (componentBackground.mode === 'proportional_size') {
          graphElement.position = {
            x: nodeWithPosition.x - nodeWidth + Math.random() / 1000,
            y: nodeWithPosition.y - (36 + graphElement.data.linesOfCode) / 3,
          };
        } else {
          graphElement.position = {
            x: nodeWithPosition.x - nodeWidth,
            y: nodeWithPosition.y - baseNodeHeight,
          };
        }
      }

      if (treeLayoutDirection === 'LR') {
        if (componentBackground.mode === 'proportional_size') {
          graphElement.position = {
            x:
              nodeWithPosition.x -
              (nodeWidth + graphElement.data.linesOfCode) / 3,
            y: nodeWithPosition.y - baseNodeHeight + Math.random() / 1000,
          };
        } else {
          graphElement.position = {
            x:
              nodeWithPosition.x -
              (nodeWidth * aditionalSpaceMultiplier) / 2 +
              Math.random() / 1000,
            y: nodeWithPosition.y,
          };
        }
      }
    }

    return graphElement;
  });
};
