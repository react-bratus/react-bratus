#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const parser_1 = __importDefault(require("./parser"));
const api_1 = __importDefault(require("./api"));
const ParserConfiguration_1 = require("./api/ParserConfiguration");
const packageJson = require('../package.json');
if (process.argv.length === 2) {
    process.argv.push('-h');
}
commander_1.program
    .description('React Bratus CLI')
    .option('-s, --start', 'Start react-bratus app')
    .option('-p, --parse', 'Parse repository')
    .option('-l, --log', 'Show logs while parsing')
    .version(packageJson.version, '-v, --version', 'Show current version of React-bratus')
    .parse(process.argv);
const options = commander_1.program.opts();
const parserOptions = {
    ...ParserConfiguration_1.DEFAULT_PARSER_CONFIGURATION,
    log: options.log,
};
if (options.start) {
    if ((0, ParserConfiguration_1.isProjectParsed)()) {
        startServer();
    }
    else {
        console.log('[Program] No data.json found. Initializing the first parsing of this project.');
        parseProject(parserOptions).then(() => startServer());
    }
}
if (options.parse) {
    parseProject(parserOptions);
}
function startServer() {
    const server = new api_1.default();
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