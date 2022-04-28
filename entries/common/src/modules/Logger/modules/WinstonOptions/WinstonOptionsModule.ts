import { Module } from '@nestjs/common';

import { WinstonOptionsFactory } from 'common/modules/Logger/modules/WinstonOptions/services/WinstonOptionsFactory';

@Module({
  providers: [WinstonOptionsFactory],
  exports: [WinstonOptionsFactory],
})
export class WinstonOptionsModule {}
