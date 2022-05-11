import Attribute from './Attribute';
import ParsableElement from './ParsableElement';
declare class JSXElement extends ParsableElement {
    private attributes;
    private conditional;
    conditionalOperator: string | undefined;
    routePath: string | undefined;
    isRouteElement: boolean;
    constructor(path: string);
    addAttribute(attribute: Attribute): void;
    setConditional(): void;
    isConditional(): boolean;
    getAttribute(key: string): Attribute | undefined;
    isRoute(): boolean;
    getName(): string;
    getId(): string;
}
export default JSXElement;
