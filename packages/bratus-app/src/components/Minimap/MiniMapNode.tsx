// Would be nice to work on this file in the future, and
// use the library instead of having this kind of duplication

import React from 'react';
import { CSSProperties } from 'react';
import cc from 'classcat';

interface MiniMapNodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  className: string;
  color: string;
  shapeRendering: string;
  strokeColor: string;
  strokeWidth: number;
  style?: CSSProperties;
}

const MiniMapNode = ({
  x,
  y,
  width,
  height,
  style,
  color,
  strokeColor,
  strokeWidth,
  className,
  borderRadius,
  shapeRendering,
}: MiniMapNodeProps) => {
  const { background, backgroundColor } = style || {};
  const fill = String(color || background || backgroundColor);

  return (
    <rect
      className={cc(['react-flow__minimap-node', className])}
      x={x}
      y={y}
      rx={borderRadius}
      ry={borderRadius}
      width={width}
      height={height}
      fill={fill}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      shapeRendering={shapeRendering}
    />
  );
};

MiniMapNode.displayName = 'MiniMapNode';

export default MiniMapNode;
