import { Module } from "@nestjs/common";
import { LoggerModule as PinoModule } from "nestjs-pino/LoggerModule";
import { pinoHttp } from "pino-http";


@Module({
  imports: [
    PinoModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || "info",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
