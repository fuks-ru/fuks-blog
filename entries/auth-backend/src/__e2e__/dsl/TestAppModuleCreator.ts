import { ICommonModuleOptions } from '@fuks-ru/common-backend';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';

import {
  IMockedUser,
  UsersBuilder,
} from 'auth-backend/__e2e__/dsl/UsersBuilder';
import { AppModule } from 'auth-backend/AppModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';

export class AppBuilder {
  private readonly usersBuilder = new UsersBuilder();

  private readonly config: typeof ConfigGetter = class extends ConfigGetter {
    /**
     * Выключает логирование в консоль и файлы во время тестов.
     */
    public override getLoggerOptions(): ICommonModuleOptions['logger'] {
      return {
        isToConsoleDisable: true,
        isToFileDisable: true,
      };
    }

    /**
     * Возвращает тестовый конфиг для подключения к БД.
     */
    public override getTypeOrmConfig(): TypeOrmModuleOptions {
      return {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: ['**/entities/**/*.ts'],
        autoLoadEntities: true,
      };
    }

    /**
     * Выключает проверку рекапчи.
     */
    public override getRecaptchaOptions(): GoogleRecaptchaModuleOptions {
      return {
        ...super.getRecaptchaOptions(),
        skipIf: true,
      };
    }
  };

  /**
   * Получает инстанс билдера.
   */
  public static app = (): AppBuilder => new AppBuilder();

  /**
   * Добавляет пользователя в БД.
   */
  public withUser(user: IMockedUser): AppBuilder {
    this.usersBuilder.addUser(user);

    return this;
  }

  /**
   * Получает Nest приложение.
   */
  public async please(): Promise<INestApplication> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigGetter)
      .useClass(this.config)
      .compile();

    const app = moduleRef.createNestApplication();

    const configGetter = moduleRef.get(ConfigGetter);

    app.setGlobalPrefix(configGetter.getApiPrefix());

    await this.usersBuilder.build(app);

    await app.init();

    return app;
  }
}
