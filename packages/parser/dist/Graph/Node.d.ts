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
declare class Node {
    id: string;
    position: Position;
    data: NodeData;
    type: string;
    constructor(id: string, data: NodeData);
}
export default Node;
