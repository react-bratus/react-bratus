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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProjectParsed = exports.makeConfiguration = exports.getConfiguration = exports.DEFAULT_PARSER_CONFIGURATION = void 0;
const fs = __importStar(require("fs"));
exports.DEFAULT_PARSER_CONFIGURATION = {
    pathToSaveDir: `${process.cwd()}/.react-bratus`,
    rootFolderPath: `${process.cwd()}/src`,
    rootComponents: ['App'],
};
function getConfiguration() {
    const path = `${process.cwd()}/.react-bratus/bratusrc.json`;
    if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
        console.log('[ParserConfig] Parsing with custom configuration from file.');
        return {
            ...exports.DEFAULT_PARSER_CONFIGURATION,
            ...JSON.parse(fs.readFileSync(path, 'utf8')),
        };
    }
    else {
        console.log('[ParserConfig] Parsing with default configuration.');
        return exports.DEFAULT_PARSER_CONFIGURATION;
    }
}
exports.getConfiguration = getConfiguration;
function makeConfiguration(input) {
    const filePath = `${process.cwd()}/.react-bratus/bratusrc.json`;
    const rootsToArray = input == '' ? 'App' : input.split(',').map((word) => word.trim());
    const customRootsObject = {
        rootComponents: rootsToArray,
    };
    fs.writeFileSync(filePath, JSON.stringify(customRootsObject));
}
exports.makeConfiguration = makeConfiguration;
function isProjectParsed() {
    return fs.existsSync(`${exports.DEFAULT_PARSER_CONFIGURATION.pathToSaveDir}/data.json`);
}
exports.isProjectParsed = isProjectParsed;
//# sourceMappingURL=ParserConfiguration.js.map