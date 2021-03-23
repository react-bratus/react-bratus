class Edge {
  public id: string;
  public source: string;
  public target: string;
  public animated: boolean;

  constructor(id: string, source: string, target: string, optional: boolean) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.animated = optional;
  }
}

export default Edge;
