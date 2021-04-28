import Component from '../Builder/Component';
import Edge from './Edge';
import Node from './Node';
declare class Graph {
    nodes: Node[];
    private componentMap;
    edges: Edge[];
    level: number;
    constructor(componentMap: Map<string, Component>);
    build(rootComponents: string[]): void;
    private buildComponentTree;
    private createNode;
    private createEdge;
    private calculateInfo;
    toString(): string;
}
export default Graph;
