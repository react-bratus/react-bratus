import ASTParser from '../ASTParser';
import Component from '../Builder/Component';
import JSXElement from '../Builder/JSXElement';
import Edge from './Edge';
import Node, { NodeData } from './Node';

class Graph {
  public nodes: Node[] = [];
  private componentMap: Map<string, Component>;
  public edges: Edge[] = [];
  public level = 0;

  constructor(componentMap: Map<string, Component>) {
    this.componentMap = componentMap;
  }

  public build(rootComponents: string[]): void {
    console.log(`[Graph Builder] Building graph`);
    console.log('root components', rootComponents);
    rootComponents.forEach((rootComponentName) => {
      const component = this.componentMap.get(rootComponentName);
      if (component) {
        ASTParser.logEntry(`[Info] Creating root node`);
        const elements = component.getJSXElements();
        component.timesUsed++;
        const root = this.createNode(component.getElementName(), {
          label: component.getElementName(),
          linesOfCode: component.getLinesOfCode(),
          code: component.code,
          path: component.getPath(),
          component,
          outDegree: 0,
          inDegree: 0,
        });
        for (let k = 0; k < elements.length; k++) {
          const element = elements[k];
          this.buildComponentTree(root, element);
        }
      }
    });
  }

  private buildComponentTree(source: Node, element: JSXElement): void {
    try {
      const component = this.componentMap.get(element.getElementName());
      if (component) {
        component.timesUsed++;
        const targetNodeId = `${source.id}:${component.getElementName()}`;
        if (!this.nodes.some((node) => node.id === targetNodeId)) {
          ASTParser.logEntry(
            `[Info] Creating link between: ${
              source.data.label
            } and ${component.getElementName()}`
          );
          if (source.id.split(':').includes(component.getElementName())) {
            console.log(
              `[Warning] Circular reference found when trying to create a link between ${
                source.id
              } to ${component.getElementName()}.`
            );
          } else {
            const target = this.createNode(
              `${source.id}:${component.getElementName()}`,
              {
                label: component.getElementName(),
                linesOfCode: component.getLinesOfCode(),
                component: component,
                code: component.code,
                path: component.getPath(),
                outDegree: 0,
                inDegree: 0,
              }
            );
            this.createEdge(source, target, element);
            if (component.hasJSX()) {
              component.getJSXElements().forEach((subElement) => {
                this.buildComponentTree(target, subElement);
              });
            }
          }
        } else {
          ASTParser.logEntry(
            `[Warning] Node with id: ${targetNodeId} already exist. Not creating duplicate node`
          );
        }
      }
    } catch (error) {
      console.log(`Error thrown: ${error}`);
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
      element.isConditional() || element.isRouteElement
    );
    if (element.isRouteElement && element.routePath) {
      edge.label = element.routePath;
    }
    if (element.isConditional()) {
      edge.conditional = element.conditionalOperator;
      edge.label = edge.conditional;
    }
    this.edges.push(edge);
    source.data.outDegree++;
    target.data.inDegree++;
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
