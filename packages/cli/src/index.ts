#!/usr/bin/env node

import * as program from 'commander';
import Server from '@my-prototype/server';

program
  .version('1.0.7')
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
