import { WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';
import { Inject, Injectable } from '@nestjs/common';
import path from 'node:path';
import Transport from 'winston-transport';

import 'winston-daily-rotate-file';

import { LoggerLevel } from 'common/backend/Logger/enums/LoggerLevel';
import { ConfigGetterBase } from 'common/backend/Config/services/ConfigGetterBase';
import { CONFIG } from 'common/constants';

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

  public constructor(
    @Inject(CONFIG)
    private readonly configGetter: ConfigGetterBase,
  ) {}

  /**
   * Создает транспорты для winston библиотеки.
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

    const config = this.configGetter.getLoggerConfig();

    const resultTransports: Transport[] = [
      new transports.Console({
        silent: config.isToConsoleDisable,
        format: format.combine(
          format.colorize({
            all: true,
          }),
          myFormat,
        ),
      }),

      new transports.DailyRotateFile({
        silent: config.isToFileDisable,
        level: LoggerLevel.ERROR,
        filename: this.logErrorFilename,
        format: myFormat,
        maxFiles: this.maxFiles,
        datePattern: this.logDatePattern,
      }),

      new transports.DailyRotateFile({
        silent: config.isToFileDisable,
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
