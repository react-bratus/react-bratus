import Component from './Models/Component';
import ParsedFile from './Models/ParsedFile';
declare class ASTParser {
    private path;
    parsedFiles: ParsedFile[];
    components: Component[];
    constructor(sourcePath: string);
    getFilesAndDirectories(): Promise<string[]>;
    private parseFile;
}
export default ASTParser;
