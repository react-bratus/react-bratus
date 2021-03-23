import Component from './Component';
interface Position {
    x: number;
    y: number;
}
interface NodeData {
    label: string;
    component: Component;
}
declare class Node {
    id: string;
    position: Position;
    data: NodeData;
    inDegree: number;
    outDegree: number;
    constructor(id: string, data: NodeData);
}
export default Node;
