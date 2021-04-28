declare class Server {
    private app;
    private config;
    listen(): Promise<void>;
    private getConfiguration;
}
export default Server;
