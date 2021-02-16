"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = express_1.default();
    }
    listen() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../node_modules/@stephanboersma/app/build')));
        this.app.get('/ping', (_req, res) => {
            const result = {
                dir: process.cwd(),
            };
            res.status(200).send(result);
        });
        this.app.get('/', (_req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../node_modules/@stephanboersma/app/build', 'index.html'));
        });
        this.app.listen(3000);
        console.log('Listening on port 3000');
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map