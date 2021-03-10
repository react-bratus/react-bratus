interface Position {
  x: number;
  y: number;
}
interface NodeData {
  label: string;
}
class Node {
  public id: string;
  public position: Position = { x: 0, y: 0 };
  public data: NodeData;

  constructor(id: string, data: NodeData) {
    this.id = id;
    this.data = data;
  }
}

export default Node;
