import { CONFIG, ILoggerModuleOptions } from '@difuks/common';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  IMockedUser,
  UsersBuilder,
} from 'auth-backend/__e2e__/services/UsersBuilder';
import { AppModule } from 'auth-backend/AppModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';

export class AppBuilder {
  private readonly usersBuilder = new UsersBuilder();

  private readonly config: typeof ConfigGetter = class extends ConfigGetter {
    /**
     * Выключает логирование в консоль и файлы во время тестов.
     */
    public override getLoggerConfig(): ILoggerModuleOptions {
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
      .overrideProvider(CONFIG)
      .useClass(this.config)
      .compile();

    const app = moduleRef.createNestApplication();

    await this.usersBuilder.build(app);

    await app.init();

    return app;
  }
}
