import { ApiErrorsModule, RequestRefModule } from '@difuks/common';
import { Global, Module } from '@nestjs/common';

import { BlogBackendService } from 'api-blog-backend/backend/services/BlogBackendService';

@Global()
@Module({
  imports: [ApiErrorsModule, RequestRefModule],
  providers: [BlogBackendService],
  exports: [BlogBackendService],
})
export class BlogBackendModule {}
