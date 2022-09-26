import { DynamicModule, Module, Type } from '@nestjs/common';

import { ConfigGetterBase } from 'common/backend/Config/services/ConfigGetterBase';
import { ConfigModule } from 'common/backend/Config/ConfigModule';
import { CookieSetterModule } from 'common/backend/CookieSetter/CookieSetterModule';
import { ErrorFilterModule } from 'common/backend/ErrorFilter/ErrorFilterModule';
import { I18nModule } from 'common/backend/I18n/I18nModule';
import { LoggerModule } from 'common/backend/Logger/LoggerModule';
import { RedirectModule } from 'common/backend/Redirect/RedirectModule';
import { RequestRefModule } from 'common/backend/RequestRef/RequestRefModule';
import { SwaggerModule } from 'common/backend/Swagger/SwaggerModule';
import { SystemErrorModule } from 'common/backend/SystemError/SystemErrorModule';
import { ValidationModule } from 'common/backend/Validation/ValidationModule';

@Module({})
export class CommonModule {
  /**
   * Регистрирует основной модуль.
   */
  public static forRoot<Config extends Type<ConfigGetterBase>>(
    ConfigClass: Config,
  ): DynamicModule {
    return {
      module: CommonModule,
      global: true,
      imports: [
        ConfigModule.forRoot(ConfigClass),
        CookieSetterModule,
        ErrorFilterModule,
        I18nModule,
        LoggerModule,
        RedirectModule,
        RequestRefModule,
        SwaggerModule,
        SystemErrorModule,
        ValidationModule,
      ],
    };
  }
}
