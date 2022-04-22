import { Module } from '@nestjs/common';

import { EncodingService } from 'auth-backend/Encoding/services/EncodingService';

@Module({
  providers: [EncodingService],
  exports: [EncodingService],
})
export class EncodingModule {}
