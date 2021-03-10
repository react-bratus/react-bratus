"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Edge_1 = __importDefault(require("./Edge"));
const Node_1 = __importDefault(require("./Node"));
class Graph {
    constructor(components) {
        this.nodes = [];
        this.edges = [];
        this.createNodes(components);
        this.createEdges(components);
    }
    createNodes(components) {
        console.log('test1', components);
        components.forEach((component) => {
            this.nodes.push(new Node_1.default(component.getFullyQualifiedName(), {
                label: component.getName(),
            }));
        });
    }
    createEdges(components) {
        console.log('test2');
        components.forEach((component) => {
            const source = component.getFullyQualifiedName();
            component
                .getRelatedComponents()
                .map((relatedComponent) => relatedComponent.name.name)
                .filter((value, index, self) => self.indexOf(value) === index)
                .forEach((fullyQualifiedName) => {
                if (this.nodes.some((node) => node.id === fullyQualifiedName)) {
                    this.edges.push(new Edge_1.default(source + fullyQualifiedName, source, fullyQualifiedName));
                }
            });
        });
    }
    toString() {
        console.log('test3');
        return JSON.stringify({
            nodes: this.nodes,
            edges: this.edges,
        });
    }
}
exports.default = Graph;
//# sourceMappingURL=Graph.js.map