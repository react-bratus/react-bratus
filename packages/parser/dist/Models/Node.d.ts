interface Position {
    x: number;
    y: number;
}
interface NodeData {
    label: string;
}
declare class Node {
    id: string;
    position: Position;
    data: NodeData;
    constructor(id: string, data: NodeData);
}
export default Node;
