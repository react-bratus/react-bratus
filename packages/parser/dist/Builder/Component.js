"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParsableElement_1 = __importDefault(require("./ParsableElement"));
class Component extends ParsableElement_1.default {
    constructor(path, code) {
        super(path);
        this.JSXElements = [];
        this.imports = [];
        this.timesUsed = 0;
        this.code = code;
    }
    getLinesOfCode() {
        const node = super.getNode();
        if (node && node.loc) {
            return node.loc.end.line - node.loc.start.line;
        }
        else {
            throw new Error('Component is not defined or does not have location data');
        }
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