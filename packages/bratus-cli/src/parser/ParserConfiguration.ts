import * as fs from 'fs';
export interface ParserOptions {
  log: boolean;
  rootFolderPath: string;
  rootComponents: string[];
  pathToSaveDir: string;
}

export const DEFAULT_CONFIGURATION = {
  currentWorkingDirectory: process.cwd(),
  pathToSaveDir: `${process.cwd()}/.react-bratus`,
  rootFolderPath: `${process.cwd()}/src`,
  rootComponents: ['App'],
};

export function getConfiguration() {
  const path = `${process.cwd()}/.bratusrc.json`;
  if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
    console.log('[ParserConfig] Getting custom configuration from file.');
    return {
      ...DEFAULT_CONFIGURATION,
      ...JSON.parse(fs.readFileSync(path, 'utf8')),
    };
  }
  console.log('[ParserConfig] No custom configuration file found.');
  return DEFAULT_CONFIGURATION;
}
