"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParsableElement_1 = __importDefault(require("./ParsableElement"));
class Component extends ParsableElement_1.default {
    constructor(path) {
        super(path);
        this.JSXElements = [];
        this.imports = [];
    }
    addJSXElement(element) {
        this.JSXElements.push(element);
    }
    addImport(_import) {
        this.imports.push(_import);
    }
    hasJSX() {
        return this.JSXElements.length > 0;
    }
    getJSXElements() {
        return this.JSXElements;
    }
}
exports.default = Component;
//# sourceMappingURL=Component.js.map