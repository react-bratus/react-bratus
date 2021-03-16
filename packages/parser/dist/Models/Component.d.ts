import JSXElement from './JSXElement';
import ParsableElement from './ParsableElement';
declare class Component extends ParsableElement {
    private JSXElements;
    private imports;
    constructor(path: string);
    addJSXElement(element: JSXElement): void;
    addImport(_import: any): void;
    hasJSX(): boolean;
    getJSXElements(): JSXElement[];
}
export default Component;
