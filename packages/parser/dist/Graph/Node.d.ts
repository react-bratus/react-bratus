import Component from '../Builder/Component';
interface Position {
    x: number;
    y: number;
}
export interface NodeData {
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