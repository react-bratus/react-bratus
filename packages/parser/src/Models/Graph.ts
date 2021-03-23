import Component from './Component';
import Edge from './Edge';
import JSXElement from './JSXElement';
import Node from './Node';

class Graph {
  public nodes: Node[] = [];
  public components: Component[] = [];
  public edges: Edge[] = [];
  public level = 0;

  constructor(components: Component[]) {
    this.components = components;
  }

  public build(): void {
    for (let i = 0; i < this.components.length; i++) {
      const component = this.components[i];
      if (component.getElementName() == 'App') {
        const elements = component.getJSXElements();
        const root = new Node(component.getElementName(), {
          label: component.getElementName(),
          component,
        });
        console.log(`Root: ${component.getElementName()}`);

        for (let k = 0; k < elements.length; k++) {
          const element = elements[k];
          console.log(`Found element: ${element.getName()}`);
          this.addEdge(root, element);
          this.level--;
        }
        if (root.outDegree > 0) this.nodes.push(root);
      }
    }
  }

  public addEdge(source: Node, element: JSXElement): void {
    this.level++;
    console.log('level: ', this.level);
    const findComponent = this.components.filter(
      (component) => component.getElementName() === element.getName()
    );
    const componentFound = findComponent.length == 1 ? findComponent[0] : null;
    if (componentFound) {
      console.log(
        `Component match with element: ${componentFound.getElementName()}. Creating link: ${
          source.id
        }:${componentFound.getElementName()}`
      );
      const targetNode = new Node(
        `${source.id}:${componentFound.getElementName()}`,
        { label: componentFound.getElementName(), component: componentFound }
      );
      const edge = new Edge(
        targetNode.id,
        source.id,
        targetNode.id,
        element.isOptional()
      );
      source.outDegree++;
      targetNode.inDegree++;
      this.nodes.push(targetNode);
      this.edges.push(edge);
      if (componentFound.hasJSX()) {
        console.log(
          `Sub component has children ${componentFound.getElementName()}.`
        );
        componentFound.getJSXElements().forEach((el) => {
          this.addEdge(targetNode, el);
          this.level--;
        });
      }
    } else {
      const mess =
        findComponent.length > 1
          ? `More than one component found`
          : `No matching component found: ${element.getName()}`;
      console.log(mess, findComponent.length);
    }
  }

  public toString(): string {
    return JSON.stringify({
      nodes: this.nodes,
      edges: this.edges,
    });
  }
}
export default Graph;
