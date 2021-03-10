import Edge from './Edge';
import Node from './Node';
import ReactComponent from './ReactComponent';
declare class Graph {
    nodes: Node[];
    edges: Edge[];
    constructor(components: ReactComponent[]);
    private createNodes;
    private createEdges;
    toString(): string;
}
export default Graph;
