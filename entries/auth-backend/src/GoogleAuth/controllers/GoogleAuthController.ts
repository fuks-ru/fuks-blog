import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { GoogleAuthRequest } from 'auth-backend/GoogleAuth/dto/GoogleAuthRequest';
import { GoogleAuth } from 'auth-backend/GoogleAuth/services/GoogleAuth';

@Controller()
@ApiTags('googleAuth')
export class GoogleAuthController {
  public constructor(private readonly googleAuth: GoogleAuth) {}

  /**
   * Маршрут для авторизации.
   */
  @Post('/auth/google')
  @ApiOperation({
    operationId: 'authGoogle',
  })
  public async auth(
    @Body() { token }: GoogleAuthRequest,
    @Res() response: Response,
  ): Promise<void> {
    response.cookie('userId', await this.googleAuth.auth(token));

    response.send();
  }
}
