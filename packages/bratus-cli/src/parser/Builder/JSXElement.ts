import Attribute from './Attribute';
import ParsableElement from './ParsableElement';

class JSXElement extends ParsableElement {
  private attributes: Map<string, Attribute> = new Map<string, Attribute>();
  private optional = false;
  public routePath: string | undefined;
  public isRouteElement = false;
  constructor(path: string) {
    super(path);
  }

  addAttribute(attribute: Attribute): void {
    if (super.isOpen()) {
      this.attributes.set(attribute.getElementName(), attribute);
    } else {
      throw new Error(
        'JSXElement.addAttribute: This component has not been opened yet.'
      );
    }
  }

  setOptional(isOptional: boolean): void {
    if (this.isRouteElement) {
      this.optional = true;
    } else {
      this.optional = isOptional;
    }
  }

  isOptional(): boolean {
    return this.optional;
  }

  getAttribute(key: string): Attribute | undefined {
    if (this.attributes.has(key)) {
      return this.attributes.get(key);
    }
    throw new Error(`The attribute ${key} does not exist on this component`);
  }

  isRoute(): boolean {
    return super.getElementName().includes('Route');
  }

  getName(): string {
    if (
      super.getElementName() === 'Route' &&
      this.attributes.has('component')
    ) {
      try {
        const component = this.getAttribute('component')?.getValue();
        return component ? component : '';
      } catch (error) {
        return super.getElementName();
      }
    } else {
      return super.getElementName();
    }
  }

  getId(): string {
    console.log(
      `${super.getPath()}:${this.getName()}:${this.getLocation().start}`
    );
    return `${super.getPath()}:${this.getName()}:${this.getLocation().start}`;
  }
}

export default JSXElement;
