#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const server_1 = __importDefault(require("@stephanboersma/server"));
commander_1.program
    .version('1.0.7')
    .description('Prototype CLI for thesis')
    .option('-s, --start', 'Start server')
    .option('-c, --compile', 'Compile prototype project')
    .parse(process.argv);
const options = commander_1.program.opts();
if (options.start) {
    console.log(commander_1.program.opts());
    console.log(process.cwd());
    const server = new server_1.default();
    server.listen();
}
//# sourceMappingURL=index.js.map