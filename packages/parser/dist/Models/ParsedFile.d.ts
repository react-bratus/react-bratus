import Component from './Component';
declare class ParsedFile {
    path: string;
    imports: any[];
    components: Component[];
    exports: any;
    constructor(path: string);
    hasComponents(): boolean;
    print(): void;
}
export default ParsedFile;
