import Component from './Component';
import Edge from './Edge';
import Node from './Node';

class Graph {
  public nodes: Node[] = [];
  public edges: Edge[] = [];

  public addNodes(components: Component[]): void {
    components.forEach((component) => {
      if (component.hasJSX()) {
        const node = new Node(component.getId(), {
          label: component.getElementName(),
          component,
        });
        this.nodes.push(node);
      }
    });
  }

  public toString(): string {
    return JSON.stringify({
      nodes: this.nodes,
      edges: this.edges,
    });
  }
}
export default Graph;
