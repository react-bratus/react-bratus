"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParsedFile {
    constructor(path) {
        this.imports = [];
        this.components = [];
        this.exports = [];
        this.path = path;
    }
    hasComponents() {
        return this.components.length > 0;
    }
    print() {
        this.components.forEach((component) => console.log(component));
    }
}
exports.default = ParsedFile;
//# sourceMappingURL=ParsedFile.js.map