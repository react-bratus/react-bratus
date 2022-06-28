import { ParserOptions } from '../api/ParserConfiguration';
declare class ASTParser {
    private componentMap;
    private options;
    private static log;
    constructor(options: ParserOptions);
    parse(): Promise<void>;
    private writeDataToFile;
    getFilesAndDirectories(): Promise<string[]>;
    static peek<T>(array: T[]): T;
    private parseFile;
    static logEntry(logEntry: string): void;
}
export default ASTParser;
