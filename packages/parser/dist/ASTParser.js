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
    printRelatedComponents() {
        this.jsxElements.forEach((element) => {
            console.log(element.name.name);
        });
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
class ASTParser {
    constructor(sourcePath) {
        this.parsedFiles = [];
        this.path = sourcePath;
        this.getFilesAndDirectories().then(async (files) => {
            for (let i = 0; i < files.length; i++) {
                const parsedFile = await this.parseFile(files[i]);
                this.parsedFiles.push(parsedFile);
            }
            this.parsedFiles.forEach((parsedFile) => {
                parsedFile.components.forEach((component) => {
                    console.log(component.toString());
                });
            });
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
    async parseFile(file) {
        return new Promise((resolve, reject) => {
            const parsedFile = {
                path: file,
                imports: [],
                components: [],
                exports: [],
            };
            let currentObject = new ReactComponent();
            try {
                const fileContent = fs.readFileSync(file, 'utf8');
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
                                parsedFile.imports.push({
                                    alias,
                                    name,
                                    source: modulePath,
                                });
                            }
                        });
                    },
                    ClassDeclaration({ node }) {
                        if (!currentObject.type) {
                            console.log('Open ClassDeclaration');
                            currentObject.type = node;
                        }
                    },
                    VariableDeclaration({ node }) {
                        if (!currentObject.type) {
                            console.log('Open VariableDeclaration');
                            currentObject.type = node;
                        }
                    },
                    FunctionDeclaration({ node }) {
                        if (!currentObject.type) {
                            console.log('Open FunctionDeclaration');
                            currentObject.type = node;
                        }
                    },
                    Identifier({ node }) {
                        if (currentObject.type && !currentObject.identifier) {
                            console.log('Identify currentObject: ', node.name);
                            currentObject.identifier = node;
                        }
                    },
                    JSXOpeningElement({ node }) {
                        if (currentObject.type) {
                            console.log('Add JSX Element');
                            currentObject.jsxElements.push(node);
                        }
                    },
                    exit({ node }) {
                        if ((node.type == 'VariableDeclaration' ||
                            node.type == 'FunctionDeclaration' ||
                            node.type == 'ClassDeclaration') &&
                            node == currentObject.type) {
                            console.log('Close' + node.type);
                            currentObject.path = file;
                            if (currentObject.hasJSX())
                                parsedFile.components.push(currentObject);
                            currentObject = new ReactComponent();
                        }
                        if (node.type == 'Program') {
                            console.log('Close' + node.type);
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