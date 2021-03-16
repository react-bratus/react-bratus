import JSXElement from './JSXElement';
import ParsableElement from './ParsableElement';
class Component extends ParsableElement {
  private JSXElements: JSXElement[] = [];
  private imports: any[] = [];
  constructor(path: string) {
    super(path);
  }

  addJSXElement(element: JSXElement): void {
    this.JSXElements.push(element);
  }

  addImport(_import: any): void {
    this.imports.push(_import);
  }

  hasJSX(): boolean {
    return this.JSXElements.length > 0;
  }
  getJSXElements(): JSXElement[] {
    return this.JSXElements;
  }
}

export default Component;
