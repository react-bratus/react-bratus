"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ASTParser_1 = __importDefault(require("../ASTParser"));
const Edge_1 = __importDefault(require("./Edge"));
const Node_1 = __importDefault(require("./Node"));
class Graph {
    constructor(componentMap) {
        this.nodes = [];
        this.edges = [];
        this.level = 0;
        this.componentMap = componentMap;
    }
    build(rootComponents) {
        ASTParser_1.default.logEntry(`[Info] Building graph`);
        rootComponents.forEach((rootComponentName) => {
            const component = this.componentMap.get(rootComponentName);
            if (component) {
                ASTParser_1.default.logEntry(`[Info] Creating root node`);
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
    buildComponentTree(source, element) {
        try {
            const component = this.componentMap.get(element.getElementName());
            if (component) {
                component.timesUsed++;
                const targetNodeId = `${source.id}:${component.getElementName()}`;
                if (!this.nodes.some((node) => node.id === targetNodeId)) {
                    ASTParser_1.default.logEntry(`[Info] Creating link between: ${source.data.label} and ${component.getElementName()}`);
                    if (source.id.split(':').includes(component.getElementName())) {
                        throw new Error(`Circular reference found when tring to create a link between ${source.id} to ${component.getElementName()} `);
                    }
                    const target = this.createNode(`${source.id}:${component.getElementName()}`, {
                        label: component.getElementName(),
                        linesOfCode: component.getLinesOfCode(),
                        component: component,
                        code: component.code,
                        path: component.getPath(),
                        outDegree: 0,
                        inDegree: 0,
                    });
                    this.createEdge(source, target, element);
                    if (component.hasJSX()) {
                        component.getJSXElements().forEach((subElement) => {
                            this.buildComponentTree(target, subElement);
                        });
                    }
                }
                else {
                    ASTParser_1.default.logEntry(`[Warning] Node with id: ${targetNodeId} already exist. Not creating duplicate node`);
                }
            }
        }
        catch (error) {
            console.log(`Error thrown: ${error}`);
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
        source.data.outDegree++;
        target.data.inDegree++;
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