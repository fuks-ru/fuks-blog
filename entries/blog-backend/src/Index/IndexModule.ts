import { Module } from '@nestjs/common';

import { IndexController } from './controllers/IndexController';

@Module({
  controllers: [IndexController],
})
export class IndexModule {}
