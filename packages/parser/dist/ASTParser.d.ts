declare class ASTParser {
    private path;
    parsedFiles: any[];
    constructor(sourcePath: string);
    getFilesAndDirectories(): Promise<string[]>;
    private parseFile;
}
export default ASTParser;
