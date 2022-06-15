import { DynamicModule, Module, Type } from '@nestjs/common';

import { CONFIG } from 'common/constants';
import { ConfigGetterBase } from 'common/backend/Config/services/ConfigGetterBase';

@Module({})
export class ConfigModule {
  /**
   * Регистрирует модуль с конфигом.
   */
  public static forRoot<Config extends Type<ConfigGetterBase>>(
    ConfigClass: Config,
  ): DynamicModule {
    return {
      module: ConfigModule,
      global: true,
      providers: [
        {
          provide: CONFIG,
          useClass: ConfigClass,
        },
      ],
      exports: [CONFIG],
    };
  }
}
