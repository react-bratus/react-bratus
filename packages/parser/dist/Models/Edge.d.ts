declare class Edge {
    id: string;
    source: string;
    target: string;
    animated: boolean;
    constructor(id: string, source: string, target: string, optional: boolean);
}
export default Edge;
