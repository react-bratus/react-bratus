import Edge from './Edge';
import Node from './Node';
import ReactComponent from './ReactComponent';

class Graph {
  public nodes: Node[] = [];
  public edges: Edge[] = [];
  constructor(components: ReactComponent[]) {
    this.createNodes(components);
    this.createEdges(components);
  }

  private createNodes(components: ReactComponent[]): void {
    console.log('test1', components);
    components.forEach((component) => {
      this.nodes.push(
        new Node(component.getFullyQualifiedName(), {
          label: component.getName(),
        })
      );
    });
  }

  private createEdges(components: ReactComponent[]): void {
    console.log('test2');
    components.forEach((component) => {
      const source = component.getFullyQualifiedName();
      component
        .getRelatedComponents()
        .map((relatedComponent) => relatedComponent.name.name)
        .filter((value, index, self) => self.indexOf(value) === index)
        .forEach((fullyQualifiedName) => {
          if (this.nodes.some((node) => node.id === fullyQualifiedName)) {
            this.edges.push(
              new Edge(source + fullyQualifiedName, source, fullyQualifiedName)
            );
          }
        });
    });
  }

  public toString(): string {
    console.log('test3');
    return JSON.stringify({
      nodes: this.nodes,
      edges: this.edges,
    });
  }
}
export default Graph;
