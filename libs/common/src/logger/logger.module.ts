import { Module } from "@nestjs/common";
import { LoggerModule as PinoModule } from "nestjs-pino";

@Module({
  imports: [
    PinoModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || "info",
        transport: process.env.NODE_ENV === "production" ? undefined : {
          target: "pino-pretty",
          options: {
            singleLine: true,
            translateTime: "SYS:standard",
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
