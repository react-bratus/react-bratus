import * as fs from 'fs';

// The interface for parser options.
export interface ParserOptions {
  log?: boolean;
  rootFolderPath: string;
  rootComponents: string[];
  pathToSaveDir: string;
}

// Default parser configuration with single root component 'App'.
export const DEFAULT_PARSER_CONFIGURATION: ParserOptions = {
  pathToSaveDir: `${process.cwd()}/.react-bratus`,
  rootFolderPath: `${process.cwd()}/src`,
  rootComponents: [],
};

/**
 * This function generates parser configuration based on either manual input from the website,
 * an extra configuration file or just returns a default configuration.
 *
 * @returns Parser configuration depending on the input
 */
export function getConfiguration(): ParserOptions {
  const path = `${process.cwd()}/.react-bratus/bratusrc.json`;
  if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
    console.log('[ParserConfig] Parsing with custom configuration from file.');

    const defaultConfigItem = {
      ...DEFAULT_PARSER_CONFIGURATION,
      ...JSON.parse(fs.readFileSync(path, 'utf8')),
    };

    return defaultConfigItem;
  } else {
    console.log('[ParserConfig] Parsing with default configuration.');
    return DEFAULT_PARSER_CONFIGURATION;
  }
}

/**
 * Create a custom configuration file 'bratusrc.json' with custom root components in the '.react-bratus' folder.
 * @param input An input string with custom root components, separated by comma.
 */
export function makeConfiguration(input: string): void {
  const filePath = `${process.cwd()}/.react-bratus/bratusrc.json`;
  const rootsToArray = input && input.split(',').map((word) => word.trim());
  const customRootsObject = {
    rootComponents: rootsToArray,
  };

  fs.writeFileSync(filePath, JSON.stringify(customRootsObject));
}

/**
 * Check if the project has been parsed before by the existence of 'data.json' file in the '.react-bratus' folder.
 * @returns A boolean true or false whether the project has been parsed before.
 */
export function isProjectParsed(): boolean {
  return fs.existsSync(
    `${DEFAULT_PARSER_CONFIGURATION.pathToSaveDir}/data.json`
  );
}
