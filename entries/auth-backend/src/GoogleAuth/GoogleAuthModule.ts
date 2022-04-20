import { Module } from '@nestjs/common';

import { GoogleAuthController } from 'auth-backend/GoogleAuth/controllers/GoogleAuthController';
import { GoogleAuth } from 'auth-backend/GoogleAuth/services/GoogleAuth';

@Module({
  providers: [GoogleAuth],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
