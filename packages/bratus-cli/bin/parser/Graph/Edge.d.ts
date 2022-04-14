declare class Edge {
    id: string;
    source: string;
    target: string;
    animated: boolean;
    label: string | undefined;
    conditional: string | undefined;
    constructor(id: string, source: string, target: string, optional: boolean);
}
export default Edge;
