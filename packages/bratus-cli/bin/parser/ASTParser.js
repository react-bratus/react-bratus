"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    constructor(options) {
        this.componentMap = new Map();
        this.options = options;
        ASTParser.log = options.log;
        console.log(`[Info] Parser initialized with path: ${this.options.rootFolderPath}`);
    }
    parse() {
        return new Promise((resolve) => {
            console.log(`[Info] Parsing project`);
            this.getFilesAndDirectories().then(async (files) => {
                ASTParser.logEntry(`[Info] Traversing files: [${files.join(',\n')}]`);
                for (let i = 0; i < files.length; i++) {
                    if (!files[i].includes('stories')) {
                        if (fs.existsSync(files[i]) && fs.lstatSync(files[i]).isFile()) {
                            const parsedFile = await this.parseFile(files[i]);
                            if (parsedFile.hasComponents()) {
                                parsedFile.components.forEach((component) => {
                                    const componentName = component.getElementName();
                                    if (!this.componentMap.has(componentName)) {
                                        ASTParser.logEntry(`[Info] Adding component: ${componentName}`);
                                        this.componentMap.set(componentName, component);
                                    }
                                    else {
                                        console.log(`[Warning] A component with the name ${componentName} already exist. The component ${componentName} at ${files[i].substr(this.options.rootFolderPath.length, files[i].length - this.options.rootFolderPath.length)} is not included`);
                                    }
                                });
                            }
                        }
                    }
                }
                const graph = new Graph_1.default(this.componentMap);
                console.log(`[Info] Parsing finished`);
                graph.build(this.options.rootComponents);
                console.log(`[Info] Building graph finished`);
                await this.writeDataToFile(graph.toString());
                resolve();
            });
        });
    }
    writeDataToFile(graphData) {
        console.log(`[Info] Writing data to ${this.options.pathToSaveDir}/data.json`);
        const dir = this.options.pathToSaveDir;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(dir + '/data.json', graphData);
    }
    getFilesAndDirectories() {
        return new Promise((resolve, reject) => {
            glob.glob(this.options.rootFolderPath + '/**/*.{js,jsx,tsx}', (err, res) => {
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
        ASTParser.logEntry(`[Info] Parsing file: ${path}`);
        return new Promise((resolve, reject) => {
            try {
                const fileContent = fs.readFileSync(path, 'utf8');
                const ast = (0, parser_1.parse)(fileContent, {
                    sourceType: 'module',
                    plugins: ['typescript', 'jsx'],
                });
                const parsedFile = new ParsedFile_1.default(path);
                let component = new Component_1.default(path, fileContent);
                const elements = [new JSXElement_1.default(path)];
                const attributes = [new Attribute_1.default()];
                let ifStatementLevel = 0;
                let isConditional = false;
                let conditionKind = '';
                let conditionIdentifier = '';
                (0, traverse_1.default)(ast, {
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
                                ASTParser.logEntry(`[Info] Import added to component: ${name}`);
                                component.addImport(new Import_1.default(alias, name, modulePath));
                            }
                        });
                    },
                    ClassDeclaration({ node }) {
                        if (component.isUndefined()) {
                            ASTParser.logEntry(`[Info] Open component by ClassDeclaration`);
                            component.open(node);
                        }
                    },
                    VariableDeclaration({ node }) {
                        if (component.isUndefined()) {
                            ASTParser.logEntry(`[Info] Open component by VariableDeclaration`);
                            component.open(node);
                        }
                    },
                    FunctionDeclaration({ node }) {
                        if (component.isUndefined()) {
                            ASTParser.logEntry(`[Info] Open component by FunctionDeclaration`);
                            component.open(node);
                        }
                    },
                    Identifier({ node }) {
                        if (component.isOpen() && !component.isIdentified()) {
                            ASTParser.logEntry(`[Info] Identify component ${node.name}`);
                            component.identify(node);
                        }
                        if (isConditional) {
                            conditionIdentifier = conditionKind + ':' + node.name;
                            console.log(`[CURRENT] --> The name of the rendering constant: ${node.name}`);
                        }
                    },
                    IfStatement() {
                        ASTParser.logEntry(`[Info] Increment level of depth in if statement: ${ifStatementLevel}`);
                        isConditional = true;
                        conditionKind = '[if]';
                    },
                    LogicalExpression() {
                        ASTParser.logEntry(`[CURRENT] Conditional rendering by '&&' found for this componenet.`);
                        isConditional = true;
                        conditionKind = '[&&]';
                    },
                    ConditionalExpression() {
                        ASTParser.logEntry(`[Info] Conditional rendering by a ternary operator found for this componenet.`);
                        isConditional = true;
                        conditionKind = '[ternary]';
                    },
                    JSXOpeningElement({ node }) {
                        const jsxElement = ASTParser.peek(elements);
                        const attribute = ASTParser.peek(attributes);
                        if (jsxElement.isUndefined()) {
                            ASTParser.logEntry(`[Info] Open jsxElement`);
                            jsxElement.open(node);
                        }
                        else {
                            if (node.name.type === 'JSXIdentifier') {
                                if (jsxElement.isRoute() &&
                                    attribute.getElementName() === 'element') {
                                    jsxElement.isRouteElement = true;
                                    jsxElement.setName(node.name.name);
                                }
                            }
                            if ((jsxElement.isRoute() &&
                                attribute.getElementName() === 'render') ||
                                attribute.getElementName() === 'element') {
                                ASTParser.logEntry(`[Info] Open jsxElement within render attribute. Resetting identifier`);
                                jsxElement.open(node);
                                jsxElement.isRouteElement = true;
                                jsxElement.resetIdentifier();
                            }
                        }
                    },
                    JSXAttribute({ node }) {
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.isUndefined()) {
                            ASTParser.logEntry(`[Info] Open Attribute`);
                            attribute.open(node);
                        }
                        else {
                            ASTParser.logEntry(`[Info] Open Attribute`);
                            const newAttribute = new Attribute_1.default();
                            newAttribute.open(node);
                            attributes.push(newAttribute);
                        }
                    },
                    JSXIdentifier({ node }) {
                        const jsxElement = ASTParser.peek(elements);
                        const attribute = ASTParser.peek(attributes);
                        if (jsxElement.isOpen() && !jsxElement.isIdentified()) {
                            ASTParser.logEntry(`[Info] Identify jsxElement ${node.name}`);
                            jsxElement.identify(node);
                        }
                        else if (attribute.isOpen() && !attribute.isIdentified()) {
                            ASTParser.logEntry(`[Info] Identify Attribute ${node.name}`);
                            attribute.identify(node);
                        }
                    },
                    JSXExpressionContainer({ node }) {
                        const jsxElement = ASTParser.peek(elements);
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.isOpen() && attribute.isIdentified()) {
                            if (node.expression.type === 'Identifier') {
                                ASTParser.logEntry(`[Info] Set value of Attribute`);
                                attribute.setValue(node.expression.name);
                                if (jsxElement.isRoute() &&
                                    attribute.getElementName() == 'component') {
                                    ASTParser.logEntry(`[Info] Set name of Route element`);
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
                            ASTParser.logEntry(`[Info] Set value of Attribute`);
                            attribute.setValue(node.value);
                            if (jsxElement.isOpen() &&
                                jsxElement.isRoute() &&
                                attribute.getElementName() == 'path') {
                                ASTParser.logEntry(`[Info] Set path of Route element`);
                                jsxElement.routePath = attribute.getValue();
                            }
                        }
                    },
                    exit({ node }) {
                        if (component.close(node)) {
                            if (component.hasJSX()) {
                                ASTParser.logEntry(`[Info] Close component: ${component.getElementName()}`);
                                parsedFile.components.push(component);
                            }
                            component = new Component_1.default(path, fileContent);
                        }
                        const jsxElement = ASTParser.peek(elements);
                        if (jsxElement.close(node)) {
                            ASTParser.logEntry(`[Info] Close Element: ${jsxElement.getElementName()}`);
                            if (conditionIdentifier) {
                                jsxElement.setConditional();
                                jsxElement.conditionalOperator = conditionIdentifier;
                            }
                            component.addJSXElement(jsxElement);
                            elements.pop();
                            if (elements.length === 0)
                                elements.push(new JSXElement_1.default(path));
                        }
                        const attribute = ASTParser.peek(attributes);
                        if (attribute.close(node)) {
                            ASTParser.logEntry(`[Info] Close Attribute: ${attribute.getElementName()}`);
                            if (jsxElement.isOpen()) {
                                jsxElement.addAttribute(attribute);
                            }
                            attributes.pop();
                            if (attributes.length === 0)
                                attributes.push(new Attribute_1.default());
                        }
                        if (node.type == 'LogicalExpression' ||
                            node.type == 'ConditionalExpression' ||
                            node.type == 'IfStatement') {
                            ASTParser.logEntry(`[CURRENT] Resetting the Logical Expression node`);
                            isConditional = false;
                            conditionIdentifier = '';
                        }
                        if (node.type == 'Program') {
                            ASTParser.logEntry(`[Info] Finish parsing file: ${parsedFile.path}`);
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
    static logEntry(logEntry) {
        if (ASTParser.log) {
            console.log(logEntry);
        }
    }
}
ASTParser.log = false;
exports.default = ASTParser;
//# sourceMappingURL=ASTParser.js.map