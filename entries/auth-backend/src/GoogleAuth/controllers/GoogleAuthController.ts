import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import { GoogleAuthRequest } from 'auth-backend/GoogleAuth/dto/GoogleAuthRequest';
import { LoginService } from 'auth-backend/Login/services/LoginService';
import { User } from 'auth-backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: User;
}

@Controller()
@ApiTags('GoogleAuth')
export class GoogleAuthController {
  public constructor(private readonly loginService: LoginService) {}

  /**
   * Маршрут для авторизации.
   */
  @Post('/auth/google')
  @ApiOperation({
    operationId: 'authGoogle',
  })
  @UseGuards(AuthGuard('google'))
  public auth(
    @Request() { user }: IRequest,
    @Body() _: GoogleAuthRequest,
  ): void {
    this.loginService.login(user);
  }
}
