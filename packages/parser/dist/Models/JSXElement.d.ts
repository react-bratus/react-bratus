import Attribute from './Attribute';
import ParsableElement from './ParsableElement';
declare class JSXElement extends ParsableElement {
    private attributes;
    private optional;
    constructor(path: string);
    addAttribute(attribute: Attribute): void;
    setOptional(isOptional: boolean): void;
    isOptional(): boolean;
    getAttribute(key: string): Attribute | undefined;
    getName(): string;
    getId(): string;
}
export default JSXElement;
