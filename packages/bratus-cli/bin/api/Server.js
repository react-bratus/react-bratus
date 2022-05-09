"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("../parser"));
const ParserConfiguration_1 = require("./ParserConfiguration");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");
class Server {
    constructor() {
        this.app = express();
    }
    async listen() {
        this.config = (0, ParserConfiguration_1.getConfiguration)();
        console.log('[ParserConfig]', this.config);
        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname, '../bratus-app')));
        this.app.use(express.json());
        this.app.get('/ping', (_req, res) => {
            const result = {
                dir: process.cwd(),
            };
            res.status(200).send(result);
        });
        this.app.get('/', (_req, res) => {
            res.sendFile(path.join(__dirname, '../bratus-app', 'index.html'));
        });
        this.app.get('/parsedData', (_req, res) => {
            res
                .status(200)
                .send(fs.readFileSync(`${this.config.pathToSaveDir}/data.json`));
        });
        this.app.post('/recompile', (_req, res) => {
            try {
                this.config = (0, ParserConfiguration_1.getConfiguration)();
                console.log('[ParserConfig] Recompiling with configuration:', this.config);
                const parserOptions = {
                    rootFolderPath: this.config.rootFolderPath,
                    log: false,
                    rootComponents: this.config.rootComponents,
                    pathToSaveDir: this.config.pathToSaveDir,
                };
                const parser = new parser_1.default(parserOptions);
                parser
                    .parse()
                    .then(() => res.status(200).send())
                    .catch(() => res.status(500).send());
            }
            catch (error) {
                console.log('An error occurred when parsing: ', error.message);
                res.status(500).send(error.message);
            }
        });
        this.app.post('/makeConfiguration', (_req, res) => {
            try {
                (0, ParserConfiguration_1.makeConfiguration)(_req.body.rootComponents);
                res.status(200).send();
            }
            catch (error) {
                console.log('An error occurred when parsing: ', error.message);
                res.status(500).send(error.message);
            }
        });
        this.app.listen(4444);
        console.log(`[Server] React-bratus listening on port http://localhost:${4444}`);
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map