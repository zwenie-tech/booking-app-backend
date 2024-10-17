import {
  createLogger,
  transports,
  format,
  Logger as WinstonLogger,
} from "winston";

class Logger {
  private logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.combine(format.timestamp(), format.simple()),
      transports: [new transports.Console()],
    });
  }

  log(level: string, message: string): void {
    this.logger.log({ level, message });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}

export const logger = new Logger();
