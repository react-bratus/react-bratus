declare class Server {
    private app;
    private config;
    listen(): Promise<void>;
}
export default Server;
