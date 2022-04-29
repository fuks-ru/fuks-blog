import { Global, Module } from '@nestjs/common';

import { BlogBackendService } from 'api-blog-backend/BlogBackend/services/BlogBackendService';

@Global()
@Module({
  providers: [BlogBackendService],
  exports: [BlogBackendService],
})
export class BlogBackendModule {}
