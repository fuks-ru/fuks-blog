import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoginService } from 'auth-backend/Login/services/LoginService';
import { BasicRegisterRequest } from 'auth-backend/Register/dto/BasicRegisterRequest';
import { BasicRegisterService } from 'auth-backend/Register/services/BasicRegisterService';

@Controller()
@ApiTags('Register')
export class RegisterController {
  public constructor(
    private readonly basicRegisterService: BasicRegisterService,
    private readonly loginService: LoginService,
  ) {}

  /**
   * Маршрут для регистрации по логину и паролю.
   */
  @Post('/register/basic')
  @ApiOperation({
    operationId: 'registerBasic',
  })
  public async basic(@Body() body: BasicRegisterRequest): Promise<void> {
    const user = await this.basicRegisterService.register(body);

    this.loginService.login(user);
  }
}
