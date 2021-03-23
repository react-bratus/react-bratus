import Component from './Component';
import Edge from './Edge';
import JSXElement from './JSXElement';
import Node from './Node';
declare class Graph {
    nodes: Node[];
    components: Component[];
    edges: Edge[];
    level: number;
    constructor(components: Component[]);
    build(): void;
    addEdge(source: Node, element: JSXElement): void;
    toString(): string;
}
export default Graph;
