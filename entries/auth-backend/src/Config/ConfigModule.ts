import { Global, Module } from '@nestjs/common';

import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';

@Global()
@Module({
  providers: [ConfigGetter],
  exports: [ConfigGetter],
})
export class ConfigModule {}
