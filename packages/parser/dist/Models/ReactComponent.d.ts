import JSXElement from './JSXElement';
declare class ReactComponent {
    type: any;
    name: string;
    jsxElements: JSXElement[];
    path: string | null;
    hasJSX(): boolean;
    getRelatedComponents(): any[];
    getName(): string;
    setName(name: string): void;
    getFullyQualifiedName(): string;
}
export default ReactComponent;
