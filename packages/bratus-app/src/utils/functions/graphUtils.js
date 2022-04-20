import dagre from 'dagre';
import { isEdge, isNode } from 'react-flow-renderer';
import { BackgroundLabels, GraphLabels } from '../constants/constants';
import { baseNodeHeight, nodeWidth } from '../constants/units';

var aditionalSpaceMultiplier = 2;

// Initialize graph.
const dagreGraph = new dagre.graphlib.Graph();

// Default to assigning a new object as a label for each new edge.
dagreGraph.setDefaultEdgeLabel(() => ({}));

/**
 * SOS: This function is complicated, check dagre documentation and dagre examples to get more information about it.
 * @param {*} nodesAndEdges the nodes and edges of the tree.
 * @param {*} treeLayoutDirection The layout direction of the tree. Read more here: https://g6.antv.vision/en/docs/api/graphLayout/dagre. It is set to a value, as this is the way JS understands optional params.
 * @param {*} setTreeLayoutDirection Setting the direction state, to use it for handles positioning.
 * @function graphElement.position Stephan: Unfortunately we need this little hack to pass a slighltiy different position to notify react flow about the change. More over we are shifting the dagre node position (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
 * @returns layouted nodes and edges.
 */
export const getLayoutedGraphElements = (
  nodesAndEdges,
  treeLayoutDirection = GraphLabels.topToBottom,
  setTreeLayoutDirection = () => {},
  componentBackground
) => {
  // Set objects for graph labels and the graph's layout direction.
  dagreGraph.setGraph({ rankdir: treeLayoutDirection });

  const isVerticalLayout = treeLayoutDirection === GraphLabels.leftToRight;

  nodesAndEdges.forEach((graphElement) => {
    if (isNode(graphElement)) {
      if (treeLayoutDirection === GraphLabels.topToBottom) {
        if (componentBackground.mode === BackgroundLabels.size) {
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
        if (componentBackground.mode === BackgroundLabels.size) {
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

  // Inform the application about the tree layout at all times.
  setTreeLayoutDirection(treeLayoutDirection);

  return nodesAndEdges.map((graphElement) => {
    if (isNode(graphElement)) {
      const nodeWithPosition = dagreGraph.node(graphElement.id);

      // Position edge-node handle elements.
      graphElement.targetPosition = isVerticalLayout ? 'left' : 'top';
      graphElement.sourcePosition = isVerticalLayout ? 'right' : 'bottom';

      if (treeLayoutDirection === GraphLabels.topToBottom) {
        if (componentBackground.mode === BackgroundLabels.size) {
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

      if (treeLayoutDirection === GraphLabels.leftToRight) {
        if (componentBackground.mode === BackgroundLabels.size) {
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
