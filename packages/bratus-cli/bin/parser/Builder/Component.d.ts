import Import from './Import';
import JSXElement from './JSXElement';
import ParsableElement from './ParsableElement';
declare class Component extends ParsableElement {
    private JSXElements;
    private imports;
    timesUsed: number;
    code: string;
    constructor(path: string, code: string);
    getLinesOfCode(): number;
    addImport(_import: Import): void;
    hasJSX(): boolean;
    addJSXElement(element: JSXElement): void;
    getJSXElements(): JSXElement[];
}
export default Component;
