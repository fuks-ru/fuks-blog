import { Module } from '@nestjs/common';

import { IndexController } from 'blog-backend/Pages/Index/controllers/IndexController';

@Module({
  controllers: [IndexController],
})
export class IndexModule {}
