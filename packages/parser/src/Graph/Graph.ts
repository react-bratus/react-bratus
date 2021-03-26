import ASTParser from '../ASTParser';
import Component from '../Builder/Component';
import JSXElement from '../Builder/JSXElement';
import Edge from './Edge';
import Node, { NodeData } from './Node';

class Graph {
  public nodes: Node[] = [];
  public components: Component[] = [];
  private componentMap: Map<string, Component>;
  public edges: Edge[] = [];
  public level = 0;

  constructor(components: Component[], componentMap: Map<string, Component>) {
    this.components = components;
    this.componentMap = componentMap;
  }

  public build(): void {
    ASTParser.logEntryToFile(`[Info] Building graph`);
    for (let i = 0; i < this.components.length; i++) {
      const component = this.components[i];
      if (component.getElementName() == 'App') {
        ASTParser.logEntryToFile(`[Info] Creating root node`);
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
      const component = this.componentMap.get(element.getElementName());
      if (component) {
        ASTParser.logEntryToFile(
          `[Info] Creating link between: ${
            source.data.label
          } and ${component.getElementName()}`
        );
        const target = this.createNode(
          `${source.id}:${component.getElementName()}`,
          {
            label: component.getElementName(),
            component: component,
          }
        );
        this.createEdge(source, target, element);
        if (component.hasJSX()) {
          component.getJSXElements().forEach((subElement) => {
            this.buildComponentTree(target, subElement);
          });
        }
      }
    } catch (error) {
      ASTParser.logEntryToFile(`Error thrown: ${error.getMessage()}`);
    }
  }

  private createNode(id: string, data: NodeData): Node {
    const node = new Node(id, data);
    this.nodes.push(node);
    return node;
  }
  private createEdge(source: Node, target: Node, element: JSXElement): Edge {
    const edge = new Edge(
      target.id,
      source.id,
      target.id,
      element.isOptional()
    );
    if (element.isRouteElement && element.routePath) {
      edge.label = element.routePath;
    }
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
