import { Global, Module } from '@nestjs/common';

import { RedirectErrorFactory } from 'common-backend/Redirect/services/RedirectErrorFactory';

@Global()
@Module({
  providers: [RedirectErrorFactory],
  exports: [RedirectErrorFactory],
})
export class RedirectModule {}
