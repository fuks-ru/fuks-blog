import { Global, Module } from '@nestjs/common';

import { SystemErrorFactory } from 'auth-backend/SystemError/services/SystemErrorFactory';

@Global()
@Module({
  providers: [SystemErrorFactory],
  exports: [SystemErrorFactory],
})
export class SystemErrorModule {}
