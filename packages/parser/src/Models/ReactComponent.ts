class ReactComponent {
  public type: any = null;
  public identifier: any = null;
  public jsxElements: any[] = [];
  public path: string | null = null;

  public hasJSX(): boolean {
    return this.jsxElements.length > 0;
  }

  public getRelatedComponents(): any[] {
    return this.jsxElements;
  }

  public getName(): string {
    return this.identifier.name;
  }

  public getFullyQualifiedName(): string {
    return `${this.getName()}`;
  }

  public toString(): string {
    let objectString = `${this.identifier.name} = {\n`;

    objectString += `  path: ${this.path},\n`;
    objectString += `  definedBy: ${this.type.type},\n`;
    objectString += `  elements: [\n`;
    this.jsxElements.forEach((element) => {
      objectString += `    ${element.name.name},\n`;
    });
    objectString += `  ]\n`;
    objectString += `}\n`;
    return objectString;
  }
}
export default ReactComponent;
