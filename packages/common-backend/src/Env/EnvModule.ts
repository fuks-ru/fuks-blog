import { Global, Module } from '@nestjs/common';

import { EnvGetter } from 'common-backend/Env/services/EnvGetter';

@Global()
@Module({
  providers: [EnvGetter],
  exports: [EnvGetter],
})
export class EnvModule {}
