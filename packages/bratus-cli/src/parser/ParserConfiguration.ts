export interface ParserOptions {
  log: boolean;
  rootFolderPath: string;
  rootComponents: string[];
  pathToSaveDir: string;
}

const currentWorkingDirectory = process.cwd();

export const DEFAULT_CONFIGURATION = {
  currentWorkingDirectory: currentWorkingDirectory,
  pathToSaveDir: `${currentWorkingDirectory}/.react-bratus`,
  rootFolderPath: `${currentWorkingDirectory}/src`,
  rootComponents: ['App'],
};
