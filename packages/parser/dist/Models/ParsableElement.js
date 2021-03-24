"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParsableElement {
    constructor(path) {
        this.path = path;
    }
    getNode() {
        return this.node;
    }
    open(node) {
        this.node = node;
        this.location = { start: this.node.start, end: this.node.end };
    }
    isOpen() {
        return !!this.node;
    }
    close(node) {
        return node === this.node;
    }
    isUndefined() {
        return this.node === undefined;
    }
    isIdentified() {
        return !!this.name;
    }
    identify(identifier) {
        if (this.node === undefined) {
            throw new Error('ParsableElement.identify: This component has not been opened yet.');
        }
        this.name = identifier.name;
    }
    getElementName() {
        if (!this.isOpen()) {
            throw new Error('ParsableElement.getElementName: This component has not been opened yet.');
        }
        if (this.name) {
            return this.name;
        }
        throw new Error('This component has not been identified yet.');
    }
    getLocation() {
        if (this.location === undefined) {
            throw new Error('ParsableElement.getLocation: This component has not been opened yet.');
        }
        return this.location;
    }
    getId() {
        return `${this.getPath()}:${this.getElementName()}`;
    }
    getPath() {
        return this.path;
    }
}
exports.default = ParsableElement;
//# sourceMappingURL=ParsableElement.js.map