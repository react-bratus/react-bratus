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
const Attribute_1 = __importDefault(require("./Builder/Attribute"));
const Component_1 = __importDefault(require("./Builder/Component"));
const Import_1 = __importDefault(require("./Builder/Import"));
const JSXElement_1 = __importDefault(require("./Builder/JSXElement"));
const ParsedFile_1 = __importDefault(require("./Builder/ParsedFile"));
const Graph_1 = __importDefault(require("./Graph/Graph"));
class ASTParser {
    constructor(sourcePath, log) {
        this.components = [];
        this.componentMap = new Map();
        this.path = sourcePath;
        ASTParser.log = log;
        ASTParser.logEntryToFile(`[Info] ASTParser initialized with path: ${this.path}`);
    }
    compile() {
        ASTParser.logEntryToFile(`[INFO] Parsing project`);
        this.getFilesAndDirectories().then(async (files) => {
            ASTParser.logEntryToFile(`[Info] Traversing files: [${files.join(',\n')}]`);
            for (let i = 0; i < files.length; i++) {
                if (!files[i].includes('stories')) {
                    const parsedFile = await this.parseFile(files[i]);
                    if (parsedFile.hasComponents()) {
                        this.components.push(...parsedFile.components);
                        parsedFile.components.forEach((component) => {
                            const componentName = component.getElementName();
                            if (!this.componentMap.has(componentName)) {
                                ASTParser.logEntryToFile(`[Info] Adding component: ${componentName}`);
                                this.componentMap.set(componentName, component);
                            }
                            else {
                                ASTParser.logEntryToFile(`[Warning] A duplicate component found which was not added: ${componentName}`);
                            }
                        });
                    }
                }
            }
            const graph = new Graph_1.default(this.components, this.componentMap);
            ASTParser.logEntryToFile(`[Info] Traversal finished`);
            graph.build();
            this.writeDataToFile(graph.toString());
        });
    }
    writeDataToFile(graphData) {
        ASTParser.logEntryToFile(`[Info] Writing data to .react-bratus/data.json`);
        const dir = this.path + '/../.react-bratus';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(dir + '/data.json', graphData);
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
        ASTParser.logEntryToFile(`[Info] Parsing file: ${path}`);
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
                                ASTParser.logEntryToFile(`[Info] Import added to component: ${name}`);
                                component.addImport(new Import_1.default(alias, name, modulePath));
                            }
                        });
                    },
                    ClassDeclaration({ node }) {
                        if (component.isUndefined()) {
                            ASTParser.logEntryToFile(`[Info] Open component by ClassDeclaration`);
                            component.open(node);
                        }
                    },
                    VariableDeclaration({ node }) {
                        if (component.isUndefined()) {
                            ASTParser.logEntryToFile(`[Info] Open component by VariableDeclaration`);
                            component.open(node);
                        }
                    },
                    FunctionDeclaration({ node }) {
                        if (component.isUndefined()) {
                            ASTParser.logEntryToFile(`[Info] Open component by FunctionDeclaration`);
                            component.open(node);
                        }
                    },
                    Identifier({ node }) {
                        if (component.isOpen() && !component.isIdentified()) {
                            ASTParser.logEntryToFile(`[Info] Identify component`);
                            component.identify(node);
                        }
                    },
                    IfStatement() {
                        ASTParser.logEntryToFile(`[Info] Increment level of depth in if statement: ${ifStatementLevel}`);
                        ifStatementLevel++;
                    },
                    JSXOpeningElement({ node }) {
                        const jsxElement = ASTParser.peek(elements);
                        const attribute = ASTParser.peek(attributes);
                        if (jsxElement.isUndefined()) {
                            ASTParser.logEntryToFile(`[Info] Open jsxElement`);
                            jsxElement.open(node);
                        }
                        else {
                            if (jsxElement.isRoute() &&
                                attribute.getElementName() == 'render') {
                                ASTParser.logEntryToFile(`[Info] Open jsxElement within render attribute. Resetting identifier`);
                                jsxElement.open(node);
                                jsxElement.isRouteElement = true;
                                jsxElement.resetIdentifier();
                            }
                        }
                    },
                    JSXAttribute({ node }) {
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.isUndefined()) {
                            ASTParser.logEntryToFile(`[Info] Open Attribute`);
                            attribute.open(node);
                        }
                        else {
                            ASTParser.logEntryToFile(`[Info] Open Attribute`);
                            const newAttribute = new Attribute_1.default();
                            newAttribute.open(node);
                            attributes.push(newAttribute);
                        }
                    },
                    JSXIdentifier({ node }) {
                        const jsxElement = ASTParser.peek(elements);
                        const attribute = ASTParser.peek(attributes);
                        if (jsxElement.isOpen() && !jsxElement.isIdentified()) {
                            ASTParser.logEntryToFile(`[Info] Identify jsxElement`);
                            jsxElement.identify(node);
                        }
                        else if (attribute.isOpen() && !attribute.isIdentified()) {
                            ASTParser.logEntryToFile(`[Info] Identify Attribute`);
                            attribute.identify(node);
                        }
                    },
                    JSXExpressionContainer({ node }) {
                        const jsxElement = ASTParser.peek(elements);
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.isOpen() && attribute.isIdentified()) {
                            if (node.expression.type === 'Identifier') {
                                ASTParser.logEntryToFile(`[Info] Set value of Attribute`);
                                attribute.setValue(node.expression.name);
                                if (jsxElement.isRoute() &&
                                    attribute.getElementName() == 'component') {
                                    ASTParser.logEntryToFile(`[Info] Set name of Route element`);
                                    jsxElement.setName(attribute.getValue());
                                    jsxElement.isRouteElement = true;
                                }
                            }
                        }
                    },
                    StringLiteral({ node }) {
                        const jsxElement = ASTParser.peek(elements);
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.isOpen() && attribute.isIdentified()) {
                            ASTParser.logEntryToFile(`[Info] Set value of Attribute`);
                            attribute.setValue(node.value);
                            if (jsxElement.isRoute() &&
                                attribute.getElementName() == 'path') {
                                ASTParser.logEntryToFile(`[Info] Set path of Route element`);
                                jsxElement.routePath = attribute.getValue();
                            }
                        }
                    },
                    exit({ node }) {
                        if (component.close(node)) {
                            if (component.hasJSX()) {
                                ASTParser.logEntryToFile(`[Info] Close component: ${component.getElementName()}`);
                                parsedFile.components.push(component);
                            }
                            component = new Component_1.default(path);
                        }
                        const jsxElement = ASTParser.peek(elements);
                        if (jsxElement.close(node)) {
                            ASTParser.logEntryToFile(`[Info] Close Element: ${jsxElement.getElementName()}`);
                            jsxElement.setOptional(ifStatementLevel > 0);
                            component.addJSXElement(jsxElement);
                            elements.pop();
                            if (elements.length === 0)
                                elements.push(new JSXElement_1.default(path));
                        }
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.close(node)) {
                            ASTParser.logEntryToFile(`[Info] Close Attribute: ${attribute.getElementName()}`);
                            if (jsxElement.isOpen()) {
                                jsxElement.addAttribute(attribute);
                            }
                            attributes.pop();
                            if (attributes.length === 0)
                                attributes.push(new Attribute_1.default());
                        }
                        if (node.type == 'IfStatement') {
                            ASTParser.logEntryToFile(`[Info] Reduce level of depth in if statement: ${ifStatementLevel}`);
                            ifStatementLevel--;
                        }
                        if (node.type == 'Program') {
                            ASTParser.logEntryToFile(`[Info] Finish parsing file: ${parsedFile.path}`);
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
    static logEntryToFile(logEntry) {
        if (ASTParser.log) {
            console.log(logEntry);
        }
    }
}
ASTParser.log = false;
exports.default = ASTParser;
//# sourceMappingURL=ASTParser.js.map