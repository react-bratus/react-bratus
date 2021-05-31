import Import from './Import';
import JSXElement from './JSXElement';
import ParsableElement from './ParsableElement';
class Component extends ParsableElement {
  private JSXElements: JSXElement[] = [];
  private imports: Import[] = [];
  public timesUsed = 0;
  public code: string;
  constructor(path: string, code: string) {
    super(path);
    this.code = code;
  }

  getLinesOfCode(): number {
    const node = super.getNode();
    if (node && node.loc) {
      return node.loc.end.line - node.loc.start.line;
    } else {
      throw new Error(
        'Component is not defined or does not have location data'
      );
    }
  }

  addJSXElement(element: JSXElement): void {
    this.JSXElements.push(element);
  }

  addImport(_import: Import): void {
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
