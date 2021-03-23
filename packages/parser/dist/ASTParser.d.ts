import Component from './Models/Component';
import ParsedFile from './Models/ParsedFile';
declare class ASTParser {
    private path;
    parsedFiles: ParsedFile[];
    components: Component[];
    constructor(sourcePath: string);
    getFilesAndDirectories(): Promise<string[]>;
    static peek<T>(array: T[]): T;
    private parseFile;
}
export default ASTParser;
