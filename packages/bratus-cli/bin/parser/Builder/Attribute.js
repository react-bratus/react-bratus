"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParsableElement_1 = __importDefault(require("./ParsableElement"));
class Attribute extends ParsableElement_1.default {
    constructor() {
        super('');
    }
    setValue(value) {
        if (!super.isOpen()) {
            throw new Error('This Attribute has not been opened yet.');
        }
        if (!super.isIdentified()) {
            throw new Error('This Attribute has not been identified yet.');
        }
        this.value = value;
    }
    getValue() {
        if (this.value === undefined) {
            throw new Error('This Attribute has no value');
        }
        return this.value;
    }
}
exports.default = Attribute;
//# sourceMappingURL=Attribute.js.map