import * as fs from 'fs';

export interface ParserOptions {
  log: boolean;
  rootFolderPath: string;
  rootComponents: string[];
  pathToSaveDir: string;
}

export const DEFAULT_CONFIGURATION = {
  pathToSaveDir: `${process.cwd()}/.react-bratus`,
  rootFolderPath: `${process.cwd()}/src`,
  rootComponents: ['App'],
};

export function getConfiguration() {
  const path = `${process.cwd()}/.bratusrc.json`;
  if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
    console.log('[ParserConfig] Parsing with custom configuration from file.');
    return {
      ...DEFAULT_CONFIGURATION,
      ...JSON.parse(fs.readFileSync(path, 'utf8')),
    };
  } else {
    console.log('[ParserConfig] Parsing with default configuration.');
    return DEFAULT_CONFIGURATION;
  }
}

export function getConfigurationFromInput(input: string) {
  console.log('[ParserConfig] Parsing with custom configuration from input.');
  return {
    pathToSaveDir: `${process.cwd()}/.react-bratus`,
    rootFolderPath: `${process.cwd()}/src`,
    rootComponents: input.split(',').map((i) => i.trim()),
  };
}
