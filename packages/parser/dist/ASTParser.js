"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
const fs = __importStar(require("fs"));
const glob = __importStar(require("glob"));
const Attribute_1 = __importDefault(require("./Models/Attribute"));
const Component_1 = __importDefault(require("./Models/Component"));
const Graph_1 = __importDefault(require("./Models/Graph"));
const Import_1 = __importDefault(require("./Models/Import"));
const JSXElement_1 = __importDefault(require("./Models/JSXElement"));
const ParsedFile_1 = __importDefault(require("./Models/ParsedFile"));
class ASTParser {
    constructor(sourcePath) {
        this.components = [];
        this.path = sourcePath;
    }
    compile() {
        this.getFilesAndDirectories().then(async (files) => {
            for (let i = 0; i < files.length; i++) {
                if (!files[i].includes('stories')) {
                    const parsedFile = await this.parseFile(files[i]);
                    if (parsedFile.hasComponents()) {
                        this.components.push(...parsedFile.components);
                    }
                }
            }
            const graph = new Graph_1.default(this.components);
            graph.build();
            fs.writeFileSync(this.path + '/../.react-bratus/data.json', graph.toString());
        });
    }
    getFilesAndDirectories() {
        return new Promise((resolve, reject) => {
            glob.glob(this.path + '/**/*.{js,jsx,tsx}', (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    static peek(array) {
        return array[array.length - 1];
    }
    async parseFile(path) {
        return new Promise((resolve, reject) => {
            const parsedFile = new ParsedFile_1.default(path);
            let component = new Component_1.default(path);
            const elements = [new JSXElement_1.default(path)];
            const attributes = [new Attribute_1.default()];
            let ifStatementLevel = 0;
            try {
                const fileContent = fs.readFileSync(path, 'utf8');
                const ast = parser_1.parse(fileContent, {
                    sourceType: 'module',
                    plugins: ['typescript', 'jsx'],
                });
                traverse_1.default(ast, {
                    ImportDeclaration({ node }) {
                        const modulePath = node.source.value;
                        node.specifiers.forEach((specifier) => {
                            const alias = specifier.local.name;
                            let name;
                            switch (specifier.type) {
                                case 'ImportSpecifier':
                                    name =
                                        specifier.imported.type === 'Identifier'
                                            ? specifier.imported.name
                                            : 'No name';
                                    break;
                                case 'ImportDefaultSpecifier':
                                    name = 'default';
                                    break;
                                case 'ImportNamespaceSpecifier':
                                    name = '*';
                                    break;
                            }
                            if (name) {
                                component.addImport(new Import_1.default(alias, name, modulePath));
                            }
                        });
                    },
                    ClassDeclaration({ node }) {
                        if (component.isUndefined()) {
                            component.open(node);
                        }
                    },
                    VariableDeclaration({ node }) {
                        if (component.isUndefined()) {
                            component.open(node);
                        }
                    },
                    FunctionDeclaration({ node }) {
                        if (component.isUndefined()) {
                            component.open(node);
                        }
                    },
                    Identifier({ node }) {
                        if (component.isOpen() && !component.isIdentified()) {
                            component.identify(node);
                        }
                    },
                    IfStatement() {
                        ifStatementLevel++;
                    },
                    JSXOpeningElement({ node }) {
                        const jsxElement = ASTParser.peek(elements);
                        if (jsxElement.isUndefined()) {
                            jsxElement.open(node);
                        }
                        else {
                            const newElement = new JSXElement_1.default(path);
                            newElement.open(node);
                            elements.push(newElement);
                        }
                    },
                    JSXAttribute({ node }) {
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.isUndefined()) {
                            attribute.open(node);
                        }
                        else {
                            const newAttribute = new Attribute_1.default();
                            newAttribute.open(node);
                            attributes.push(newAttribute);
                        }
                    },
                    JSXIdentifier({ node }) {
                        const jsxElement = ASTParser.peek(elements);
                        const attribute = ASTParser.peek(attributes);
                        if (jsxElement.isOpen() && !jsxElement.isIdentified()) {
                            jsxElement.identify(node);
                        }
                        else if (attribute.isOpen() && !attribute.isIdentified()) {
                            attribute.identify(node);
                        }
                    },
                    JSXExpressionContainer({ node }) {
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.isOpen() && attribute.isIdentified()) {
                            if (node.expression.type === 'Identifier') {
                                attribute.setValue(node.expression.name);
                            }
                        }
                    },
                    StringLiteral({ node }) {
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.isOpen() && attribute.isIdentified()) {
                            attribute.setValue(node.value);
                        }
                    },
                    exit({ node }) {
                        if (component.close(node)) {
                            parsedFile.components.push(component);
                            component = new Component_1.default(path);
                        }
                        const jsxElement = ASTParser.peek(elements);
                        if (jsxElement.close(node)) {
                            jsxElement.setOptional(ifStatementLevel > 0);
                            component.addJSXElement(jsxElement);
                            elements.pop();
                            if (elements.length === 0)
                                elements.push(new JSXElement_1.default(path));
                        }
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.close(node)) {
                            jsxElement.addAttribute(attribute);
                            attributes.pop();
                            if (attributes.length === 0)
                                attributes.push(new Attribute_1.default());
                        }
                        if (node.type == 'IfStatement') {
                            ifStatementLevel--;
                        }
                        if (node.type == 'Program') {
                            resolve(parsedFile);
                        }
                    },
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.default = ASTParser;
//# sourceMappingURL=ASTParser.js.map