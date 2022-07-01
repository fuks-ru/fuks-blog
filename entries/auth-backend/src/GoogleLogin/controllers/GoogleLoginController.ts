import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { Request as ExpressRequest } from 'express';

import { Public } from 'auth-backend/Auth/decorators/Public';
import { GoogleLoginRequest } from 'auth-backend/GoogleLogin/dto/GoogleLoginRequest';
import { LoginService } from 'auth-backend/Login/services/LoginService';
import { User } from 'auth-backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: User;
  body: GoogleLoginRequest;
}

@Controller()
@ApiTags('GoogleAuth')
export class GoogleLoginController {
  public constructor(private readonly loginService: LoginService) {}

  /**
   * Маршрут для авторизации.
   */
  @Post('/login/google')
  @ApiOperation({
    operationId: 'loginGoogle',
  })
  @Public()
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('google'))
  public auth(
    @Request() { user, body }: IRequest,
    @Body() _: GoogleLoginRequest,
  ): void {
    this.loginService.login(user, body.redirectFrom);
  }
}
