#!/usr/bin/env node

import ASTParser from '@stephanboersma/parser';
import Server from '@stephanboersma/server';
import { program } from 'commander';

const packageJson = require('../package.json');

program
  .version(packageJson.version)
  .description('Prototype CLI for thesis')
  .option('-s, --start', 'Start server')
  .option('-c, --compile', 'Compile prototype project')
  .parse(process.argv);

const options = program.opts();
if (options.start) {
  console.log(program.opts());
  console.log(process.cwd());
  const s = new Server();
  s.listen();
}

if (options.compile) {
  const parser = new ASTParser(`${process.cwd()}/src/App.js`);
  parser.parsePath();
}
