declare class ReactComponent {
    type: any;
    identifier: any;
    jsxElements: any[];
    path: string | null;
    hasJSX(): boolean;
    getRelatedComponents(): any[];
    getName(): string;
    getFullyQualifiedName(): string;
    toString(): string;
}
export default ReactComponent;
