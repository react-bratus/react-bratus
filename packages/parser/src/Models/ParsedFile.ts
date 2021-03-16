import Component from './Component';

class ParsedFile {
  public path: string;
  imports: any[] = [];
  components: Component[] = [];
  exports: any = [];

  constructor(path: string) {
    this.path = path;
  }

  public hasComponents(): boolean {
    return this.components.length > 0;
  }

  public print(): void {
    this.components.forEach((component) => console.log(component));
  }
}
export default ParsedFile;
