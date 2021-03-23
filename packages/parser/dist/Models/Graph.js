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
        this.components = [];
        this.edges = [];
        this.level = 0;
        this.components = components;
    }
    build() {
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
    buildComponentTree(source, element) {
        try {
            const component = this.findComponent(element);
            const target = this.createNode(`${source.id}:${component.getElementName()}`, {
                label: component.getElementName(),
                component: component,
            });
            this.createEdge(source, target, element.isOptional());
            if (component.hasJSX()) {
                component.getJSXElements().forEach((subElement) => {
                    this.buildComponentTree(target, subElement);
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    findComponent(element) {
        const components = this.components.filter((component) => component.getElementName() === element.getName());
        if (components.length === 1) {
            return components[0];
        }
        else if (components.length > 1) {
            console.log(components.map((c) => c.getElementName()));
            throw new Error('More than one component found');
        }
        else {
            throw new Error('No component found: ' + element.getName());
        }
    }
    createNode(id, data) {
        const node = new Node_1.default(id, data);
        this.nodes.push(node);
        return node;
    }
    createEdge(source, target, optional) {
        const edge = new Edge_1.default(target.id, source.id, target.id, optional);
        this.edges.push(edge);
        source.outDegree++;
        target.inDegree++;
        return edge;
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