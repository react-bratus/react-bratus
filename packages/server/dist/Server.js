"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("@react-bratus/parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const currentWorkingDirectory = process.cwd();
const DEFAULT_CONFIGURATION = {
    pathToSaveDir: `${currentWorkingDirectory}/.react-bratus`,
    rootFolderPath: `${currentWorkingDirectory}/src`,
    rootComponents: ['App'],
};
class Server {
    constructor() {
        this.app = express_1.default();
    }
    async listen() {
        this.config = await this.getConfiguration();
        this.app.use(cors_1.default());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../app/build')));
        this.app.get('/ping', (_req, res) => {
            const result = {
                dir: process.cwd(),
            };
            res.status(200).send(result);
        });
        this.app.get('/', (_req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../../app/build', 'index.html'));
        });
        this.app.get('/parsedData', (_req, res) => {
            res
                .status(200)
                .send(fs_1.default.readFileSync(`${this.config.pathToSaveDir}/data.json`));
        });
        this.app.post('/compile', (_req, res) => {
            try {
                const parserOptions = {
                    rootFolderPath: this.config.rootFolderPath,
                    log: true,
                    rootComponents: this.config.rootComponents,
                    pathToSaveDir: this.config.pathToSaveDir,
                };
                const parser = new parser_1.default(parserOptions);
                parser.parse();
                res.status(200).send();
            }
            catch (error) {
                console.log('An error occurred when parsing: ', error.message);
                res.status(500).send(error.message);
            }
        });
        this.app.listen(4444);
        console.log(`React-bratus listening on port http://localhost:${4444}`);
    }
    async getConfiguration() {
        const path = `${currentWorkingDirectory}/.bratusrc.json`;
        if ((await fs_1.default.existsSync(path)) && (await fs_1.default.lstatSync(path).isFile())) {
            return {
                ...DEFAULT_CONFIGURATION,
                ...JSON.parse(await fs_1.default.readFileSync(path, 'utf8')),
            };
        }
        return DEFAULT_CONFIGURATION;
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map