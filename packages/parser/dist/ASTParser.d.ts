import Component from './Builder/Component';
declare class ASTParser {
    private path;
    components: Component[];
    constructor(sourcePath: string);
    compile(): void;
    private writeDataToFile;
    getFilesAndDirectories(): Promise<string[]>;
    static peek<T>(array: T[]): T;
    private parseFile;
}
export default ASTParser;
