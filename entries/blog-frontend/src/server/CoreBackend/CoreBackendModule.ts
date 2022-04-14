import { Module } from '@nestjs/common';

import { CoreBackendService } from 'blog-frontend/server/CoreBackend/services/CoreBackendService';

@Module({
  providers: [CoreBackendService],
  exports: [CoreBackendService],
})
export class CoreBackendModule {}
