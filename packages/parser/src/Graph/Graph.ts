import Component from '../Builder/Component';
import JSXElement from '../Builder/JSXElement';
import Edge from './Edge';
import Node, { NodeData } from './Node';

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
        const root = this.createNode(component.getElementName(), {
          label: component.getElementName(),
          component,
        });
        for (let k = 0; k < elements.length; k++) {
          const element = elements[k];
          this.buildComponentTree(root, element);
        }
      }
    }
  }

  private buildComponentTree(source: Node, element: JSXElement): void {
    try {
      const component = this.findComponent(element);
      const target = this.createNode(
        `${source.id}:${component.getElementName()}`,
        {
          label: component.getElementName(),
          component: component,
        }
      );
      this.createEdge(source, target, element.isOptional());
      if (component.hasJSX()) {
        component.getJSXElements().forEach((subElement) => {
          this.buildComponentTree(target, subElement);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  private findComponent(element: JSXElement): Component {
    const components = this.components.filter(
      (component) => component.getElementName() === element.getName()
    );
    if (components.length === 1) {
      return components[0];
    } else if (components.length > 1) {
      console.log(components.map((c) => c.getElementName()));
      throw new Error('More than one component found');
    } else {
      throw new Error('No component found: ' + element.getName());
    }
  }

  private createNode(id: string, data: NodeData): Node {
    const node = new Node(id, data);
    this.nodes.push(node);
    return node;
  }
  private createEdge(source: Node, target: Node, optional: boolean): Edge {
    const edge = new Edge(target.id, source.id, target.id, optional);
    this.edges.push(edge);
    source.outDegree++;
    target.inDegree++;
    return edge;
  }

  public toString(): string {
    return JSON.stringify({
      nodes: this.nodes,
      edges: this.edges,
    });
  }
}
export default Graph;
