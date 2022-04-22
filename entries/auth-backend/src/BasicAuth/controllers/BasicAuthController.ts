import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import { BasicAuthRequest } from 'auth-backend/BasicAuth/dto/BasicAuthRequest';
import { LoginService } from 'auth-backend/Login/services/LoginService';
import { User } from 'auth-backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: User;
}

@Controller()
@ApiTags('BasicAuth')
export class BasicAuthController {
  public constructor(private readonly loginService: LoginService) {}

  /**
   * Маршрут для авторизации по логину и паролю.
   */
  @Post('/basic-auth/login')
  @ApiOperation({
    operationId: 'authBasicLogin',
  })
  @UseGuards(AuthGuard('local'))
  public login(
    @Request() { user }: IRequest,
    @Body() _: BasicAuthRequest,
  ): void {
    this.loginService.login(user);
  }
}
