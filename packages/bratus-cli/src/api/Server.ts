import ASTParser from '../parser';
import {
  ParserOptions,
  getConfiguration,
  makeConfiguration,
} from './ParserConfiguration';
import cors = require('cors');
import express = require('express');
import fs = require('fs');
import path = require('path');

class Server {
  private app = express();
  private config: ParserOptions;

  constructor(options: ParserOptions) {
    this.config = options;
  }

  public async listen(): Promise<void> {
    this.config = getConfiguration();
    console.log('[ParserConfig]', this.config);
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, '../bratus-app')));
    this.app.use(express.json());

    this.app.get('/ping', (_req: express.Request, res: express.Response) => {
      const result = {
        dir: process.cwd(),
      };
      res.status(200).send(result);
    });

    this.app.get('/', (_req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, '../bratus-app', 'index.html'));
    });

    // The server gets parsed data from /data.json file so that the App.js can build the graph tree.
    this.app.get(
      '/parsedData',
      (_req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send(fs.readFileSync(`${this.config.pathToSaveDir}/data.json`));
      }
    );

    // The server recompiles the project.
    this.app.post(
      '/recompile',
      (_req: express.Request, res: express.Response) => {
        try {
          this.config = getConfiguration();

          console.log(
            '[ParserConfig] Recompiling with configuration:',
            this.config
          );

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log('An error occurred when parsing: ', error.message);
          res.status(500).send(error.message);
        }
      }
    );

    // The server creates a custom configuration file based on user's input on the React website.
    this.app.post('/makeConfiguration', (_req, res) => {
      try {
        makeConfiguration(_req.body.rootComponents);
        res.status(200).send();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log('An error occurred when parsing: ', error.message);
        res.status(500).send(error.message);
      }
    });

    this.app.listen(4444);
    console.log(
      `[Server] React-bratus listening on port http://localhost:${4444}`
    );
  }
}

export default Server;
