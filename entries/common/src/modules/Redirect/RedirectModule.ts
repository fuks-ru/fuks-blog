import { Global, Module } from '@nestjs/common';

import { RedirectErrorFactory } from 'common/modules/Redirect/services/RedirectErrorFactory';

@Global()
@Module({
  providers: [RedirectErrorFactory],
  exports: [RedirectErrorFactory],
})
export class RedirectModule {}
