import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ErrorFilter } from 'blog-backend/ErrorFilter/filters/ErrorFilter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class ErrorFilterModule {}
