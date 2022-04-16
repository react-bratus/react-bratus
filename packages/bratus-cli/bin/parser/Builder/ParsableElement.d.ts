import { Identifier, JSXIdentifier, Node } from '@babel/types';
interface Location {
    start: number | null;
    end: number | null;
}
declare class ParsableElement {
    private path;
    private location;
    private node;
    private name;
    constructor(path: string);
    getNode(): Node | undefined;
    open(node: Node): void;
    isOpen(): boolean;
    close(node: Node): boolean;
    isUndefined(): boolean;
    isIdentified(): boolean;
    identify(identifier: Identifier | JSXIdentifier): void;
    setName(name: string): void;
    resetIdentifier(): void;
    getElementName(): string;
    getLocation(): Location;
    getId(): string;
    getPath(): string;
}
export default ParsableElement;
