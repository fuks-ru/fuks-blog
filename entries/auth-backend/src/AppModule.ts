import { Module } from '@nestjs/common';
import { LoggerModule, SwaggerModule } from '@difuks/common';

import { ConfigModule } from 'auth-backend/Config/ConfigModule';
import { ErrorFilterModule } from 'auth-backend/ErrorFilter/ErrorFilterModule';
import { GoogleAuthModule } from 'auth-backend/GoogleAuth/GoogleAuthModule';
import { SystemErrorModule } from 'auth-backend/SystemError/SystemErrorModule';

@Module({
  imports: [
    SystemErrorModule,
    ErrorFilterModule,
    LoggerModule,
    ConfigModule,
    GoogleAuthModule,
    SwaggerModule,
  ],
})
export class AppModule {}
