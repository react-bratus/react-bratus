"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(id, data) {
        this.position = { x: 0, y: 0 };
        this.inDegree = 0;
        this.outDegree = 0;
        this.id = id;
        this.data = data;
    }
}
exports.default = Node;
//# sourceMappingURL=Node.js.map