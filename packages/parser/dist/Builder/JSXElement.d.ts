import Attribute from './Attribute';
import ParsableElement from './ParsableElement';
declare class JSXElement extends ParsableElement {
    private attributes;
    private optional;
    routePath: string | undefined;
    isRouteElement: boolean;
    constructor(path: string);
    addAttribute(attribute: Attribute): void;
    setOptional(isOptional: boolean): void;
    isOptional(): boolean;
    getAttribute(key: string): Attribute | undefined;
    isRoute(): boolean;
    getName(): string;
    getId(): string;
}
export default JSXElement;
