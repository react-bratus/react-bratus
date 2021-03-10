import ParsedFile from './Models/ParsedFile';
declare class ASTParser {
    private path;
    parsedFiles: ParsedFile[];
    constructor(sourcePath: string);
    getFilesAndDirectories(): Promise<string[]>;
    private parseFile;
}
export default ASTParser;
