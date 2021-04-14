#!/usr/bin/env node

import ASTParser from '@react-bratus/parser';
import Server from '@react-bratus/server';
import { program } from 'commander';
import * as fs from 'fs';

const packageJson = require('../package.json');

program
  .version(packageJson.version)
  .description('React Bratus CLI')
  .option('-s, --start', 'Start server')
  .option('-c, --compile', 'Compile prototype project')
  .option('-l, --log', 'Show logs while parsing')
  .parse(process.argv);

const options = program.opts();
if (options.start) {
  if (fs.existsSync(`${process.cwd()}/.react-bratus/data.json`)) {
    const server = new Server();
    server.listen();
  } else {
    const parser = new ASTParser(`${process.cwd()}/src`, !!options.log);
    parser.compile();
    const server = new Server();
    server.listen();
  }
}

if (options.compile) {
  const parser = new ASTParser(`${process.cwd()}/src`, !!options.log);
  parser.compile();
}
