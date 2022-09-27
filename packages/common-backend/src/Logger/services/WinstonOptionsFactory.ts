import { WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';
import { Injectable } from '@nestjs/common';
import path from 'node:path';
import Transport from 'winston-transport';

import 'winston-daily-rotate-file';

import { LoggerLevel } from 'common-backend/Logger/enums/LoggerLevel';
import { ILoggerModuleOptions } from 'common-backend/Logger/types/ILoggerModuleOptions';

@Injectable()
export class WinstonOptionsFactory {
  private readonly timestampFormat = 'DD.MM.YYYY HH:MM:SS';

  private readonly logErrorFilename = path.join(
    process.cwd(),
    '/var/logs/error-%DATE%.log',
  );

  private readonly logCombineFilename = path.join(
    process.cwd(),
    '/var/logs/combined-%DATE%.log',
  );

  private readonly maxFiles = '14d';

  private readonly logDatePattern = 'DD-MM-YYYY';

  /**
   * Создает транспорты для winston библиотеки.
   */
  public create(
    options: ILoggerModuleOptions | undefined,
  ): WinstonModuleOptions {
    const myFormat = format.combine(
      format.timestamp({
        format: this.timestampFormat,
      }),
      format.printf(
        ({ level, message, timestamp }) =>
          `${timestamp as string} [${level}]: ${message as string}`,
      ),
    );

    const resultTransports: Transport[] = [
      new transports.Console({
        silent: options?.isToConsoleDisable,
        format: format.combine(
          format.colorize({
            all: true,
          }),
          myFormat,
        ),
      }),

      new transports.DailyRotateFile({
        silent: options?.isToFileDisable,
        level: LoggerLevel.ERROR,
        filename: this.logErrorFilename,
        format: myFormat,
        maxFiles: this.maxFiles,
        datePattern: this.logDatePattern,
      }),

      new transports.DailyRotateFile({
        silent: options?.isToFileDisable,
        level: LoggerLevel.INFO,
        filename: this.logCombineFilename,
        format: myFormat,
        maxFiles: this.maxFiles,
        datePattern: this.logDatePattern,
      }),
    ];

    return {
      transports: resultTransports,
    };
  }
}
