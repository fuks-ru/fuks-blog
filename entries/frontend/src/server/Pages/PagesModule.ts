import { Module } from '@nestjs/common';

import { IndexController } from 'frontend/server/Pages/controllers/IndexController';

@Module({
  controllers: [IndexController],
})
export class PagesModule {}
