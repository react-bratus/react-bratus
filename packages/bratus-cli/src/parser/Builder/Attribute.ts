import ParsableElement from './ParsableElement';

class Attribute extends ParsableElement {
  private value: string | undefined;
  constructor() {
    super('');
  }

  setValue(value: string): void {
    if (!super.isOpen()) {
      throw new Error('This Attribute has not been opened yet.');
    }
    if (!super.isIdentified()) {
      throw new Error('This Attribute has not been identified yet.');
    }
    this.value = value;
  }

  getValue(): string {
    if (this.value === undefined) {
      throw new Error('This Attribute has no value');
    }
    return this.value;
  }
}
export default Attribute;
