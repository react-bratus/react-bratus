import ReactComponent from './ReactComponent';
declare class ParsedFile {
    path: string;
    imports: any[];
    components: ReactComponent[];
    exports: any;
    constructor(path: string);
    hasComponents(): boolean;
}
export default ParsedFile;
