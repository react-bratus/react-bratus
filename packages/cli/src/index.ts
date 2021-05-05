#!/usr/bin/env node

import ASTParser from '@react-bratus/parser';
import Server from '@react-bratus/server';
import { program } from 'commander';
import * as fs from 'fs';

const packageJson = require('../package.json');

interface ParserOptions {
  log: boolean;
  rootFolderPath: string;
  rootComponents: string[];
  pathToSaveDir: string;
}

const currentWorkingDirectory = process.cwd();
const DEFAULT_CONFIGURATION = {
  pathToSaveDir: `${currentWorkingDirectory}/.react-bratus`,
  rootFolderPath: `${currentWorkingDirectory}/src`,
  rootComponents: ['App'],
};

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
if (options.start) {
  if (fs.existsSync(`${config.pathToSaveDir}/data.json`)) {
    startServer();
  } else {
    parseProject(parserOptions);
    startServer();
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

function parseProject(options: ParserOptions) {
  const parser = new ASTParser(options);
  parser.parse();
}
