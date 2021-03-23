"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Edge_1 = __importDefault(require("./Edge"));
const Node_1 = __importDefault(require("./Node"));
class Graph {
    constructor() {
        this.nodes = [];
        this.components = [];
        this.edges = [];
        this.level = 0;
    }
    addNodes(components) {
        this.components.push(...components);
    }
    createEdges() {
        for (let i = 0; i < this.components.length; i++) {
            const component = this.components[i];
            if (component.getElementName() == 'App') {
                const elements = component.getJSXElements();
                const root = new Node_1.default(component.getElementName(), {
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
                if (root.outDegree > 0)
                    this.nodes.push(root);
            }
        }
    }
    addEdge(source, element) {
        this.level++;
        console.log('level: ', this.level);
        const findComponent = this.components.filter((component) => component.getElementName() === element.getName());
        const componentFound = findComponent.length == 1 ? findComponent[0] : null;
        if (componentFound) {
            console.log(`Component match with element: ${componentFound.getElementName()}. Creating link: ${source.id}:${componentFound.getElementName()}`);
            const targetNode = new Node_1.default(`${source.id}:${componentFound.getElementName()}`, { label: componentFound.getElementName(), component: componentFound });
            const edge = new Edge_1.default(targetNode.id, source.id, targetNode.id, element.isOptional());
            source.outDegree++;
            targetNode.inDegree++;
            this.nodes.push(targetNode);
            this.edges.push(edge);
            if (componentFound.hasJSX()) {
                console.log(`Sub component has children ${componentFound.getElementName()}.`);
                componentFound.getJSXElements().forEach((el) => {
                    this.addEdge(targetNode, el);
                    this.level--;
                });
            }
        }
        else {
            const mess = findComponent.length > 1
                ? `More than one component found`
                : `No matching component found: ${element.getName()}`;
            console.log(mess, findComponent.length);
        }
    }
    toString() {
        return JSON.stringify({
            nodes: this.nodes,
            edges: this.edges,
        });
    }
}
exports.default = Graph;
//# sourceMappingURL=Graph.js.map