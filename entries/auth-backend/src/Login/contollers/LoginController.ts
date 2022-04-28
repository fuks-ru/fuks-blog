import { Body, Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserVerifyRequest } from 'auth-backend/Login/dto/UserVerifyRequest';
import { UserVerifyResponse } from 'auth-backend/Login/dto/UserVerifyResponse';
import { LoginService } from 'auth-backend/Login/services/LoginService';

@Controller('/login')
@ApiTags('Login')
export class LoginController {
  public constructor(private readonly loginService: LoginService) {}

  /**
   * Маршрут для получения пользователя по токену.
   */
  @Get('/verify')
  @ApiOperation({
    operationId: 'loginVerify',
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
