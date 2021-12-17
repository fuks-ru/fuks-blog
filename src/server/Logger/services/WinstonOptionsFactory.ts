import { WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';
import { Injectable } from '@nestjs/common';
import path from 'node:path';
import 'winston-daily-rotate-file';

import { LoggerLevel } from '@server/Logger/enums/LoggerLevel';

@Injectable()
export class WinstonOptionsFactory {
  private readonly timestampFormat = 'DD.MM.YYYY HH:MM:SS';

  private readonly logErrorFilename = path.join(
    process.cwd(),
    '/var/error-%DATE%.log',
  );

  private readonly logCombineFilename = path.join(
    process.cwd(),
    '/var/combined-%DATE%.log',
  );

  private readonly maxFiles = '14d';

  private readonly logDatePattern = 'DD-MM-YYYY';

  /**
   * Создает траспорты для winston библиотеки.
   */
  public create(): WinstonModuleOptions {
    const myFormat = format.combine(
      format.timestamp({
        format: this.timestampFormat,
      }),
      format.printf(
        ({ level, message, timestamp }) =>
          `${timestamp as string} [${level}]: ${message}`,
      ),
    );

    const consoleTransport = new transports.Console({
      format: format.combine(
        format.colorize({
          all: true,
        }),
        myFormat,
      ),
    });

    const fileErrorTransport = new transports.DailyRotateFile({
      level: LoggerLevel.ERROR,
      filename: this.logErrorFilename,
      format: myFormat,
      maxFiles: this.maxFiles,
      datePattern: this.logDatePattern,
    });

    const fileCombinedTransport = new transports.DailyRotateFile({
      level: LoggerLevel.INFO,
      filename: this.logCombineFilename,
      format: myFormat,
      maxFiles: this.maxFiles,
      datePattern: this.logDatePattern,
    });

    return {
      transports: [consoleTransport, fileErrorTransport, fileCombinedTransport],
    };
  }
}
