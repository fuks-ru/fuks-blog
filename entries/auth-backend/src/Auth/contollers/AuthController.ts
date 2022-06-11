import { Body, Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserVerifyRequest } from 'auth-backend/Auth/dto/UserVerifyRequest';
import { UserVerifyResponse } from 'auth-backend/Auth/dto/UserVerifyResponse';
import { AuthService } from 'auth-backend/Auth/services/AuthService';

@Controller()
@ApiTags('Login')
export class AuthController {
  public constructor(private readonly loginService: AuthService) {}

  /**
   * Маршрут для получения пользователя по токену.
   */
  @Get('/auth/verify')
  @ApiOperation({
    operationId: 'authVerify',
  })
  @ApiOkResponse({
    type: UserVerifyResponse,
  })
  public async verify(
    @Body() body: UserVerifyRequest,
  ): Promise<UserVerifyResponse> {
    return this.loginService.verify(body);
  }
}
