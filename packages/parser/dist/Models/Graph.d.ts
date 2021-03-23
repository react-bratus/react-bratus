import Component from './Component';
import Edge from './Edge';
import Node from './Node';
declare class Graph {
    nodes: Node[];
    components: Component[];
    edges: Edge[];
    level: number;
    constructor(components: Component[]);
    build(): void;
    private buildComponentTree;
    private findComponent;
    private createNode;
    private createEdge;
    toString(): string;
}
export default Graph;
