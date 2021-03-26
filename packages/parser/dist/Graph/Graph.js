"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ASTParser_1 = __importDefault(require("../ASTParser"));
const Edge_1 = __importDefault(require("./Edge"));
const Node_1 = __importDefault(require("./Node"));
class Graph {
    constructor(components, componentMap) {
        this.nodes = [];
        this.components = [];
        this.edges = [];
        this.level = 0;
        this.components = components;
        this.componentMap = componentMap;
    }
    build() {
        ASTParser_1.default.logEntryToFile(`[Info] Building graph`);
        for (let i = 0; i < this.components.length; i++) {
            const component = this.components[i];
            if (component.getElementName() == 'App') {
                ASTParser_1.default.logEntryToFile(`[Info] Creating root node`);
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
            const component = this.componentMap.get(element.getElementName());
            if (component) {
                ASTParser_1.default.logEntryToFile(`[Info] Creating link between: ${source.data.label} and ${component.getElementName()}`);
                const target = this.createNode(`${source.id}:${component.getElementName()}`, {
                    label: component.getElementName(),
                    component: component,
                });
                this.createEdge(source, target, element);
                if (component.hasJSX()) {
                    component.getJSXElements().forEach((subElement) => {
                        this.buildComponentTree(target, subElement);
                    });
                }
            }
        }
        catch (error) {
            ASTParser_1.default.logEntryToFile(`Error thrown: ${error.getMessage()}`);
        }
    }
    createNode(id, data) {
        const node = new Node_1.default(id, data);
        this.nodes.push(node);
        return node;
    }
    createEdge(source, target, element) {
        const edge = new Edge_1.default(target.id, source.id, target.id, element.isOptional());
        if (element.isRouteElement && element.routePath) {
            edge.label = element.routePath;
        }
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