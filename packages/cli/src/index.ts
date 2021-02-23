#!/usr/bin/env node

import { program } from 'commander';
import Server from '@stephanboersma/server';
import ASTParser from '@stephanboersma/parser';

program
  .version('1.1.6-alpha.2')
  .description('Prototype CLI for thesis')
  .option('-s, --start', 'Start server')
  .option('-c, --compile', 'Compile prototype project')
  .parse(process.argv);

const options = program.opts();
if (options.start) {
  console.log(program.opts());
  console.log(process.cwd());
  const server: Server = new Server();
  server.listen();
}

if (options.compile) {
  const parser = new ASTParser(`${process.cwd()}/src/App.js`);
  parser.parsePath();
}
