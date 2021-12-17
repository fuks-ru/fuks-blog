import { Module } from '@nestjs/common';

import { IndexController } from '@server/Index/controllers/IndexController';

@Module({
  controllers: [IndexController],
})
export class IndexModule {}
