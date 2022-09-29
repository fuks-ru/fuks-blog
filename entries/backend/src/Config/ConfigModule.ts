import { Global, Module } from '@nestjs/common';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

@Global()
@Module({
  providers: [ConfigGetter],
  exports: [ConfigGetter],
})
export class ConfigModule {}
