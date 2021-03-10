"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReactComponent {
    constructor() {
        this.type = null;
        this.identifier = null;
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
        return this.identifier.name;
    }
    getFullyQualifiedName() {
        return `${this.getName()}`;
    }
    toString() {
        let objectString = `${this.identifier.name} = {\n`;
        objectString += `  path: ${this.path},\n`;
        objectString += `  definedBy: ${this.type.type},\n`;
        objectString += `  elements: [\n`;
        this.jsxElements.forEach((element) => {
            objectString += `    ${element.name.name},\n`;
        });
        objectString += `  ]\n`;
        objectString += `}\n`;
        return objectString;
    }
}
exports.default = ReactComponent;
//# sourceMappingURL=ReactComponent.js.map