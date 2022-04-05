import React from 'react';
import { HTMLAttributes, useCallback, useRef } from 'react';
import cc from 'classcat';
import {
  Node,
  Rect,
  Box,
  useStoreState,
  getRectOfNodes,
  useZoomPanHelper,
} from 'react-flow-renderer';
import MiniMapNode from './MiniMapNode';
import {
  createUseGesture,
  UserHandlers,
  wheelAction,
  dragAction,
} from '@use-gesture/react';

type StringFunc = (node: Node) => string;

export interface MiniMapProps extends HTMLAttributes<SVGSVGElement> {
  nodeColor?: string | StringFunc;
  nodeStrokeColor?: string | StringFunc;
  nodeClassName?: string | StringFunc;
  nodeBorderRadius?: number;
  nodeStrokeWidth?: number;
  maskColor?: string;
}

// declare const window: any;

const defaultWidth = 200;
const defaultHeight = 150;

const getBoundsOfBoxes = (box1: Box, box2: Box): Box => ({
  x: Math.min(box1.x, box2.x),
  y: Math.min(box1.y, box2.y),
  x2: Math.max(box1.x2, box2.x2),
  y2: Math.max(box1.y2, box2.y2),
});

const rectToBox = ({ x, y, width, height }: Rect): Box => ({
  x,
  y,
  x2: x + width,
  y2: y + height,
});

const boxToRect = ({ x, y, x2, y2 }: Box): Rect => ({
  x,
  y,
  width: x2 - x,
  height: y2 - y,
});

const getBoundsofRects = (rect1: Rect, rect2: Rect): Rect =>
  boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));

const useGesture = createUseGesture([dragAction, wheelAction]);

const MiniMap = ({
  style,
  className,
  nodeStrokeColor = '#555',
  nodeColor = '#fff',
  nodeClassName = '',
  nodeBorderRadius = 5,
  nodeStrokeWidth = 2,
  maskColor = 'rgb(240, 242, 243, 0.7)',
}: MiniMapProps) => {
  const containerWidth = useStoreState((s) => s.width);
  const containerHeight = useStoreState((s) => s.height);
  const [tX, tY, tScale] = useStoreState((s) => s.transform);
  const nodes = useStoreState((s) => s.nodes);

  const mapClasses = cc(['react-flow__minimap', className]);
  const elementWidth = Number(style?.width || defaultWidth);
  const elementHeight = Number(style?.height || defaultHeight);
  const nodeColorFunc =
    nodeColor instanceof Function ? nodeColor : () => nodeColor;
  const nodeStrokeColorFunc =
    nodeStrokeColor instanceof Function
      ? nodeStrokeColor
      : () => nodeStrokeColor;
  const nodeClassNameFunc =
    nodeClassName instanceof Function ? nodeClassName : () => nodeClassName;
  const hasNodes = nodes && nodes.length;
  const bb = getRectOfNodes(nodes);
  const viewBB: Rect = {
    x: -tX / tScale,
    y: -tY / tScale,
    width: containerWidth / tScale,
    height: containerHeight / tScale,
  };
  const boundingRect = hasNodes ? getBoundsofRects(bb, viewBB) : viewBB;
  const scaledWidth = boundingRect.width / elementWidth;
  const scaledHeight = boundingRect.height / elementHeight;
  const viewScale = Math.max(scaledWidth, scaledHeight);
  const viewWidth = viewScale * elementWidth;
  const viewHeight = viewScale * elementHeight;
  const offset = 5 * viewScale;
  const x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
  const y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
  const width = viewWidth + offset * 2;
  const height = viewHeight + offset * 2;
  const shapeRendering =
    typeof window === 'undefined' ? 'crispEdges' : 'geometricPrecision';

  const minZoom = useStoreState((s) => s.minZoom);
  const maxZoom = useStoreState((s) => s.maxZoom);

  const rectRef = useRef<SVGRectElement>(null);

  const { transform } = useZoomPanHelper();

  const onDrag = useCallback<UserHandlers['onDrag']>(
    ({ delta: [x, y] }) => {
      transform({
        x: tX + -x * tScale * scaledWidth,
        y: tY + -y * tScale * scaledHeight,
        zoom: tScale,
      });
    },
    [scaledHeight, scaledWidth, tScale, tX, tY, transform]
  );

  const onWheel = useCallback<UserHandlers['onWheel']>(
    ({ event: { clientX, clientY, deltaY }, active }) => {
      if (!active) return;
      const sign = Math.sign(deltaY);

      const { x, y } = rectRef.current?.getBoundingClientRect() || {
        x: clientX,
        y: clientY,
      };
      const pX = clientX - x;
      const pY = clientY - y;

      const multiplier = sign === -1 ? 1.2 : sign === 1 ? 1 / 1.2 : 1;
      const zoom = tScale * multiplier;
      if (zoom > maxZoom || zoom < minZoom) return;
      transform({
        x: tX + sign * pX * zoom,
        y: tY + sign * pY * zoom,
        zoom,
      });
    },
    [tScale, maxZoom, minZoom, transform, tX, tY]
  );

  const bind = useGesture({
    onWheel,
    onDrag,
  });

  return (
    <svg
      width={elementWidth}
      height={elementHeight}
      viewBox={`${x} ${y} ${width} ${height}`}
      style={style}
      className={mapClasses}
    >
      {nodes
        .filter((node) => !node.isHidden)
        .map((node) => (
          <MiniMapNode
            key={node.id}
            x={node.__rf.position.x}
            y={node.__rf.position.y}
            width={node.__rf.width}
            height={node.__rf.height}
            style={node.style}
            className={nodeClassNameFunc(node)}
            color={nodeColorFunc(node)}
            borderRadius={nodeBorderRadius}
            strokeColor={nodeStrokeColorFunc(node)}
            strokeWidth={nodeStrokeWidth}
            shapeRendering={shapeRendering}
          />
        ))}
      <rect
        ref={rectRef}
        className="react-flow__minimap-mask"
        x={viewBB.x}
        y={viewBB.y}
        width={viewBB.width}
        height={viewBB.height}
        fill={maskColor}
        fillRule="evenodd"
        style={{
          touchAction: 'none',
        }}
        {...bind()}
      />
    </svg>
  );
};

MiniMap.displayName = 'MiniMap';

export default MiniMap;
