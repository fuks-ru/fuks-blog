import { Global, Module } from '@nestjs/common';

import { SystemErrorFactory } from 'common/modules/SystemError/services/SystemErrorFactory';

@Global()
@Module({
  providers: [SystemErrorFactory],
  exports: [SystemErrorFactory],
})
export class SystemErrorModule {}
