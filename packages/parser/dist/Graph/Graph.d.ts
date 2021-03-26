import Component from '../Builder/Component';
import Edge from './Edge';
import Node from './Node';
declare class Graph {
    nodes: Node[];
    components: Component[];
    private componentMap;
    edges: Edge[];
    level: number;
    constructor(components: Component[], componentMap: Map<string, Component>);
    build(): void;
    private buildComponentTree;
    private createNode;
    private createEdge;
    toString(): string;
}
export default Graph;
