import ParsableElement from './ParsableElement';
declare class Attribute extends ParsableElement {
    private value;
    constructor();
    setValue(value: string): void;
    getValue(): string;
}
export default Attribute;
