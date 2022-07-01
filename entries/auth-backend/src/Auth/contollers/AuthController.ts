import { Body, Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from 'auth-backend/Auth/decorators/Public';
import { UserVerifyRequest } from 'auth-backend/Auth/dto/UserVerifyRequest';
import { UserVerifyResponse } from 'auth-backend/Auth/dto/UserVerifyResponse';
import { AuthService } from 'auth-backend/Auth/services/AuthService';

@Controller()
@ApiTags('Login')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

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
  @Public()
  public async verify(
    @Body() body: UserVerifyRequest,
  ): Promise<UserVerifyResponse> {
    return this.authService.verify(body);
  }
}
