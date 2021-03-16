import Attribute from './Attribute';
import ParsableElement from './ParsableElement';
declare class JSXElement extends ParsableElement {
    private attributes;
    constructor(path: string);
    addAttribute(attribute: Attribute): void;
    getAttribute(key: string): Attribute | undefined;
    getName(): string;
    getId(): string;
}
export default JSXElement;
