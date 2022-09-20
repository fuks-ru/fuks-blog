import { Module } from '@nestjs/common';

import { IndexController } from 'blog-frontend/pages/IndexController';

@Module({
  controllers: [IndexController],
})
export class PagesModule {}
