import * as fs from 'fs';

// The interface for parser options.
export interface ParserOptions {
  log: boolean;
  rootFolderPath: string;
  rootComponents: string[];
  pathToSaveDir: string;
}

// Default parser configuration - one root component: 'App'
export const DEFAULT_PARSER_CONFIGURATION = {
  pathToSaveDir: `${process.cwd()}/.react-bratus`,
  rootFolderPath: `${process.cwd()}/src`,
  rootComponents: ['App'],
};

/**
 * This function generates parser configuration based on either manual input from the website,
 * an extra configuration file or just returns a default configuration.
 * @param input An input string with custom root components, separated by comma.
 * @returns Parser configuration depending on the input
 */
export function getConfiguration(input?: string) {
  const path = `${process.cwd()}/.bratusrc.json`;
  if (input) {
    console.log('[ParserConfig] Parsing with custom configuration from input.');
    const roots = input == '' ? 'App' : input.split(',').map((i) => i.trim());
    return {
      pathToSaveDir: `${process.cwd()}/.react-bratus`,
      rootFolderPath: `${process.cwd()}/src`,
      rootComponents: roots,
    };
  } else if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
    console.log('[ParserConfig] Parsing with custom configuration from file.');
    return {
      ...DEFAULT_PARSER_CONFIGURATION,
      ...JSON.parse(fs.readFileSync(path, 'utf8')),
    };
  } else {
    console.log('[ParserConfig] Parsing with default configuration.');
    return DEFAULT_PARSER_CONFIGURATION;
  }
}
