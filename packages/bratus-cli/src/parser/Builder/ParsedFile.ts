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
}
export default ParsedFile;
