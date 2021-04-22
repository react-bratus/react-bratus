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
class Server {
    constructor() {
        this.app = express_1.default();
    }
    listen() {
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
                .send(fs_1.default.readFileSync(`${process.cwd()}/.react-bratus/data.json`));
        });
        this.app.post('/compile', (_req, res) => {
            const parser = new parser_1.default(`${process.cwd()}/src`, true);
            parser.compile();
            res.status(200).send();
        });
        this.app.listen(4444);
        console.log('Listening on port 4444');
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map