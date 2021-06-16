#!/usr/bin/env node
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
const parser_1 = __importDefault(require("@react-bratus/parser"));
const server_1 = __importDefault(require("@react-bratus/server"));
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const packageJson = require('../package.json');
const currentWorkingDirectory = process.cwd();
const DEFAULT_CONFIGURATION = {
    pathToSaveDir: `${currentWorkingDirectory}/.react-bratus`,
    rootFolderPath: `${currentWorkingDirectory}/src`,
    rootComponents: ['App'],
};
commander_1.program
    .version(packageJson.version)
    .description('React Bratus CLI')
    .option('-s, --start', 'Start react-bratus app')
    .option('-p, --parse', 'Parse repository')
    .option('-l, --log', 'Show logs while parsing')
    .parse(process.argv);
const options = commander_1.program.opts();
const config = getConfiguration();
const parserOptions = {
    rootFolderPath: config.rootFolderPath,
    log: options.log,
    rootComponents: config.rootComponents,
    pathToSaveDir: config.pathToSaveDir,
};
if (options.start) {
    if (fs.existsSync(`${config.pathToSaveDir}/data.json`)) {
        startServer();
    }
    else {
        parseProject(parserOptions).then(() => startServer());
    }
}
if (options.parse) {
    parseProject(parserOptions);
}
function getConfiguration() {
    const path = `${currentWorkingDirectory}/.bratusrc.json`;
    if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
        return {
            ...DEFAULT_CONFIGURATION,
            ...JSON.parse(fs.readFileSync(path, 'utf8')),
        };
    }
    return DEFAULT_CONFIGURATION;
}
function startServer() {
    const server = new server_1.default();
    server.listen();
    const url = 'http://localhost:4444';
    const start = process.platform == 'darwin'
        ? 'open'
        : process.platform == 'win32'
            ? 'start'
            : 'xdg-open';
    require('child_process').exec(start + ' ' + url);
}
function parseProject(options) {
    try {
        const parser = new parser_1.default(options);
        return parser.parse();
    }
    catch (error) {
        throw new Error('An error occurred when parsing: ' + error.message);
    }
}
//# sourceMappingURL=index.js.map