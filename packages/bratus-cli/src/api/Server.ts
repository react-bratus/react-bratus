import ASTParser from '../parser';
import cors = require('cors');
import express = require('express');
import fs = require('fs');
import path = require('path');

const currentWorkingDirectory = process.cwd();
const DEFAULT_CONFIGURATION = {
  pathToSaveDir: `${currentWorkingDirectory}/.react-bratus`,
  rootFolderPath: `${currentWorkingDirectory}/src`,
  rootComponents: ['App'],
};
interface ParserOptions {
  log: boolean;
  rootFolderPath: string;
  rootComponents: string[];
  pathToSaveDir: string;
}

class Server {
  private app = express();
  private config: any;
  public async listen(): Promise<void> {
    this.config = await this.getConfiguration();
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, '../bratus-app')));

    this.app.get('/ping', (_req: express.Request, res: express.Response) => {
      const result = {
        dir: process.cwd(),
      };
      res.status(200).send(result);
    });
    this.app.get('/', (_req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, '../bratus-app', 'index.html'));
    });
    this.app.get(
      '/parsedData',
      (_req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send(fs.readFileSync(`${this.config.pathToSaveDir}/data.json`));
      }
    );
    this.app.post(
      '/compile',
      (_req: express.Request, res: express.Response) => {
        try {
          const parserOptions: ParserOptions = {
            rootFolderPath: this.config.rootFolderPath,
            log: false,
            rootComponents: this.config.rootComponents,
            pathToSaveDir: this.config.pathToSaveDir,
          };
          const parser = new ASTParser(parserOptions);
          parser
            .parse()
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
        } catch (error: any) {
          console.log('An error occurred when parsing: ', error.message);
          res.status(500).send(error.message);
        }
      }
    );
    this.app.listen(4444);
    console.log(`React-bratus listening on port http://localhost:${4444}`);
  }
  private async getConfiguration() {
    const path = `${currentWorkingDirectory}/.bratusrc.json`;
    if ((await fs.existsSync(path)) && (await fs.lstatSync(path).isFile())) {
      return {
        ...DEFAULT_CONFIGURATION,
        ...JSON.parse(await fs.readFileSync(path, 'utf8')),
      };
    }
    return DEFAULT_CONFIGURATION;
  }
}

export default Server;
