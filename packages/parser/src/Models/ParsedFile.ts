import ReactComponent from './ReactComponent';

class ParsedFile {
  public path: string;
  imports: any[] = [];
  components: ReactComponent[] = [];
  exports: any = [];

  constructor(path: string) {
    this.path = path;
  }

  public hasComponents(): boolean {
    return this.components.length > 0;
  }
}
export default ParsedFile;
