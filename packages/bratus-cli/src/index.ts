#!/usr/bin/env node

import { program } from 'commander';
import ASTParser from './parser';
import Server from './api';
import { ParserOptions, getConfiguration } from './api/ParserConfiguration';

const packageJson = require('../package.json');

program
  .version(packageJson.version)
  .description('React Bratus CLI')
  .option('-s, --start', 'Start react-bratus app')
  .option('-p, --parse', 'Parse repository')
  .option('-l, --log', 'Show logs while parsing')
  .parse(process.argv);

const options = program.opts();
const config = getConfiguration();

const parserOptions: ParserOptions = {
  rootFolderPath: config.rootFolderPath,
  log: options.log,
  rootComponents: config.rootComponents,
  pathToSaveDir: config.pathToSaveDir,
};

// The bratus --start command always parses the project and then starts the server.
if (options.start) {
  parseProject(parserOptions).then(() => startServer());
}

if (options.parse) {
  parseProject(parserOptions);
}

function startServer() {
  const server = new Server();
  server.listen();
  const url = 'http://localhost:4444';
  const start =
    process.platform == 'darwin'
      ? 'open'
      : process.platform == 'win32'
      ? 'start'
      : 'xdg-open';
  require('child_process').exec(start + ' ' + url);
}

function parseProject(options: ParserOptions): Promise<void> {
  try {
    const parser = new ASTParser(options);
    return parser.parse();
  } catch (error: any) {
    throw new Error('An error occurred when parsing: ' + error.message);
  }
}
