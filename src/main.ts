import { App } from "./config/app-config";
import { logger } from "./shared/utils/logger";

class Server {
  private app: App;
  private port: number;

  constructor(port: number = 3000) {
    this.app = new App();
    this.port = port;
  }

  public start(): void {
    this.app.getApp().listen(this.port, () => {
      logger.info(`Server is running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
