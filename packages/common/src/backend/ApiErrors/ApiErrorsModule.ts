import { Module } from '@nestjs/common';

import { ApiErrorsService } from 'common/backend/ApiErrors/services/ApiErrorsService';
import { ValidationModule } from 'common/backend/Validation/ValidationModule';

@Module({
  imports: [ValidationModule],
  providers: [ApiErrorsService],
  exports: [ApiErrorsService],
})
export class ApiErrorsModule {}
