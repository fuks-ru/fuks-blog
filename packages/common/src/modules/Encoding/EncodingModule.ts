import { Module } from '@nestjs/common';

import { EncodingService } from 'common/modules/Encoding/services/EncodingService';

@Module({
  providers: [EncodingService],
  exports: [EncodingService],
})
export class EncodingModule {}
