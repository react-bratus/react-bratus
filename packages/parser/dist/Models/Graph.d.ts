import Component from './Component';
import Edge from './Edge';
import Node from './Node';
declare class Graph {
    nodes: Node[];
    edges: Edge[];
    addNodes(components: Component[]): void;
    toString(): string;
}
export default Graph;
