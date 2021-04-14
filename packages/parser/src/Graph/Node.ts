import Component from '../Builder/Component';

interface Position {
  x: number;
  y: number;
}
export interface NodeData {
  label: string;
  linesOfCode: number;
  inDegree: number;
  outDegree: number;
  component: Component;
}
class Node {
  public id: string;
  public position: Position = { x: 0, y: 0 };
  public data: NodeData;
  public type = 'reactComponent';

  constructor(id: string, data: NodeData) {
    this.id = id;
    this.data = data;
  }
}

export default Node;
