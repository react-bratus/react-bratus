import express from 'express';
import path from 'path';

class Server {
  private app = express();

  public listen(): void {
    this.app.use(express.static(path.join(__dirname, '../../app/build')));

    this.app.get('/ping', (_req: express.Request, res: express.Response) => {
      const result = {
        dir: process.cwd(),
      };
      res.status(200).send(result);
    });
    this.app.get('/', (_req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, '../../app/build', 'index.html'));
    });
    this.app.listen(3000);
    console.log('Listening on port 3000');
  }
}

export default Server;
