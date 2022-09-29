import { Global, Module } from '@nestjs/common';

import { BlogBackendService } from 'blog-frontend/server/BlogBackend/services/BlogBackendService';

@Global()
@Module({
  providers: [BlogBackendService],
  exports: [BlogBackendService],
})
export class BlogBackendModule {}
