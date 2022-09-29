import { Global, Module } from '@nestjs/common';

import { ConfigGetter } from 'frontend/server/Config/services/ConfigGetter';

@Global()
@Module({
  providers: [ConfigGetter],
  exports: [ConfigGetter],
})
export class ConfigModule {}
