#!/usr/bin/env node

import { program } from 'commander';
import * as fs from 'fs';

import ASTParser from './parser';
import Server from './api';
import {
  ParserOptions,
  DEFAULT_CONFIGURATION,
} from './parser/ParserConfiguration';

const packageJson = require('../package.json');

program
  .version(packageJson.version)
  .description('React Bratus CLI')
  .option('-s, --start', 'Start react-bratus app')
  .option('-p, --parse', 'Parse repository')
  .option('-l, --log', 'Show logs while parsing')
  .parse(process.argv);

const options = program.opts();
const customConfigurationFile = `${DEFAULT_CONFIGURATION.currentWorkingDirectory}/.bratusrc.json`;
const config = getConfiguration();
console.log('Roots from config: ' + config.rootComponents);

const parserOptions: ParserOptions = {
  rootFolderPath: config.rootFolderPath,
  log: options.log,
  rootComponents: config.rootComponents,
  pathToSaveDir: config.pathToSaveDir,
};

if (options.start) {
  parseProject(parserOptions).then(() => startServer());
  // if (fs.existsSync(`${config.pathToSaveDir}/data.json`)) {
  //   startServer();
  // } else {
  //   parseProject(parserOptions).then(() => startServer());
  // }
}

if (options.parse) {
  parseProject(parserOptions);
}

function getConfiguration() {
  if (
    fs.existsSync(customConfigurationFile) &&
    fs.lstatSync(customConfigurationFile).isFile()
  ) {
    console.log('[COMMANDER] Getting custom configuration from path');
    return {
      ...DEFAULT_CONFIGURATION,
      ...JSON.parse(fs.readFileSync(customConfigurationFile, 'utf8')),
    };
  }
  console.log('[COMMANDER] No custom configuration file found.');
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

function parseProject(options: ParserOptions): Promise<void> {
  try {
    const parser = new ASTParser(options);
    console.log('[COMMANDER] Parsing project.');
    return parser.parse();
  } catch (error: any) {
    throw new Error('An error occurred when parsing: ' + error.message);
  }
}
