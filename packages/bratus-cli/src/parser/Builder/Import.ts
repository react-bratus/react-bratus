class Import {
  public alias: string;
  public name: string;
  public source: string;

  constructor(alias: string, name: string, source: string) {
    this.alias = alias;
    this.name = name;
    this.source = source;
  }
}
export default Import;
