"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }
    addNodes(components) {
        components.forEach((component) => {
            if (component.hasJSX()) {
                const node = new Node_1.default(component.getId(), {
                    label: component.getElementName(),
                    component,
                });
                this.nodes.push(node);
            }
        });
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