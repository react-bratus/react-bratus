#!/usr/bin/env node

import ASTParser from '@react-bratus/parser';
import Server from '@react-bratus/server';
import { program } from 'commander';
import * as fs from 'fs';

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
  if (fs.existsSync(`${process.cwd()}/graphData.json`)) {
    const s = new Server();
    s.listen();
  } else {
    const parser = new ASTParser(`${process.cwd()}/src`);
    const s = new Server();
    s.listen();
  }
}

if (options.compile) {
  const parser = new ASTParser(`${process.cwd()}/src`);
  console.log(parser);
}
