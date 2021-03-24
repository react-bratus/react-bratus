"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReactComponent {
    constructor() {
        this.type = null;
        this.name = '';
        this.jsxElements = [];
        this.path = null;
    }
    hasJSX() {
        return this.jsxElements.length > 0;
    }
    getRelatedComponents() {
        return this.jsxElements;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getFullyQualifiedName() {
        return `${this.path}:${this.getName()}`;
    }
}
exports.default = ReactComponent;
//# sourceMappingURL=ReactComponent.js.map