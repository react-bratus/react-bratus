export interface ParserOptions {
    log: boolean;
    rootFolderPath: string;
    rootComponents: string[];
    pathToSaveDir: string;
}
export declare const DEFAULT_PARSER_CONFIGURATION: {
    pathToSaveDir: string;
    rootFolderPath: string;
    rootComponents: string[];
};
export declare function getConfiguration(): any;
export declare function makeConfiguration(input: string): void;
export declare function isProjectParsed(): boolean;
