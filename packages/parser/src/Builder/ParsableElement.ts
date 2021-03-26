import { Identifier, JSXIdentifier, Node } from '@babel/types';

interface Location {
  start: number | null;
  end: number | null;
}

class ParsableElement {
  private path: string;
  private location: Location | undefined;
  private node: Node | undefined;
  private name: string | undefined;

  constructor(path: string) {
    this.path = path;
  }
  getNode(): Node | undefined {
    return this.node;
  }
  open(node: Node): void {
    this.node = node;
    this.location = { start: this.node.start, end: this.node.end };
  }
  isOpen(): boolean {
    return !!this.node;
  }
  close(node: Node): boolean {
    return node === this.node;
  }
  isUndefined(): boolean {
    return this.node === undefined;
  }
  isIdentified(): boolean {
    return !!this.name;
  }
  identify(identifier: Identifier | JSXIdentifier): void {
    if (this.node === undefined) {
      throw new Error(
        'ParsableElement.identify: This component has not been opened yet.'
      );
    }
    this.name = identifier.name;
  }
  setName(name: string): void {
    this.name = name;
  }
  resetIdentifier(): void {
    this.name = undefined;
  }

  getElementName(): string {
    if (!this.isOpen()) {
      throw new Error(
        'ParsableElement.getElementName: This component has not been opened yet.'
      );
    }

    if (this.name) {
      return this.name;
    }
    throw new Error('This component has not been identified yet.');
  }

  getLocation(): Location {
    if (this.location === undefined) {
      throw new Error(
        'ParsableElement.getLocation: This component has not been opened yet.'
      );
    }
    return this.location;
  }

  getId(): string {
    return `${this.getPath()}:${this.getElementName()}`;
  }

  getPath(): string {
    return this.path;
  }
}

export default ParsableElement;
