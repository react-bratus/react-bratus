#!/usr/bin/env node

import { program } from 'commander';
import ASTParser from './parser';
import Server from './api';
import {
  ParserOptions,
  isProjectParsed,
  DEFAULT_PARSER_CONFIGURATION,
} from './api/ParserConfiguration';

const packageJson = require('../package.json');

// If user does not specify any flag, bratus will run 'help' as the default.
if (process.argv.length === 2) {
  process.argv.push('-h');
}

program
  .description('React Bratus CLI')
  .option('-s, --start', 'Start react-bratus app')
  .option('-p, --parse', 'Parse repository')
  .option('-l, --log', 'Show logs while parsing')
  .version(
    packageJson.version,
    '-v, --version',
    'Show current version of React-bratus'
  )
  .parse(process.argv);

const options = program.opts();

const parserOptions: ParserOptions = {
  ...DEFAULT_PARSER_CONFIGURATION,
  log: options.log,
};

// The bratus --start command always parses the project and then starts the server.
if (options.start) {
  if (isProjectParsed()) {
    startServer();
  } else {
    console.log(
      '[Program] No data.json found. Initializing the first parsing of this project.'
    );
    parseProject(parserOptions).then(() => startServer());
  }
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
