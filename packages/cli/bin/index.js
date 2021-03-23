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
commander_1.program
    .version(packageJson.version)
    .description('React Bratus CLI')
    .option('-s, --start', 'Start server')
    .option('-c, --compile', 'Compile prototype project')
    .parse(process.argv);
const options = commander_1.program.opts();
if (options.start) {
    if (fs.existsSync(`${process.cwd()}/graphData.json`)) {
        const server = new server_1.default();
        server.listen();
    }
    else {
        const parser = new parser_1.default(`${process.cwd()}/src`);
        parser.compile();
        const server = new server_1.default();
        server.listen();
    }
}
if (options.compile) {
    const parser = new parser_1.default(`${process.cwd()}/src`);
    parser.compile();
}
//# sourceMappingURL=index.js.map