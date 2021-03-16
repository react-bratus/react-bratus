"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParsableElement_1 = __importDefault(require("./ParsableElement"));
class JSXElement extends ParsableElement_1.default {
    constructor(path) {
        super(path);
        this.attributes = new Map();
    }
    addAttribute(attribute) {
        if (super.isOpen()) {
            this.attributes.set(attribute.getElementName(), attribute);
        }
        else {
            throw new Error('JSXElement.addAttribute: This component has not been opened yet.');
        }
    }
    getAttribute(key) {
        if (this.attributes.has(key)) {
            return this.attributes.get(key);
        }
        throw new Error(`The attribute ${key} does not exist on this component`);
    }
    getName() {
        var _a;
        if (super.getElementName() === 'Route' &&
            this.attributes.has('component')) {
            try {
                const component = (_a = this.getAttribute('component')) === null || _a === void 0 ? void 0 : _a.getValue();
                return component ? component : '';
            }
            catch (error) {
                console.log(error);
                return super.getElementName();
            }
        }
        else {
            return super.getElementName();
        }
    }
    getId() {
        console.log(`${super.getPath()}:${this.getName()}:${this.getLocation().start}`);
        return `${super.getPath()}:${this.getName()}:${this.getLocation().start}`;
    }
}
exports.default = JSXElement;
//# sourceMappingURL=JSXElement.js.map