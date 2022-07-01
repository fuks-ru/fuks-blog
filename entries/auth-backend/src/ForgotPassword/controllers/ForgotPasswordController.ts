import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';

import { Public } from 'auth-backend/Auth/decorators/Public';
import { ForgotPasswordService } from 'auth-backend/ForgotPassword/services/ForgotPasswordService';
import { ChangePasswordService } from 'auth-backend/ForgotPassword/services/ChangePasswordService';
import { ForgotPasswordRequest } from 'auth-backend/ForgotPassword/dto/ForgotPasswordRequest';
import { UserService } from 'auth-backend/User/services/UserService';
import { ChangePasswordRequest } from 'auth-backend/ForgotPassword/dto/ChangePasswordRequest';

@Controller('/forgot-password')
@ApiTags('ForgotPassword')
export class ForgotPasswordController {
  public constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly changePasswordService: ChangePasswordService,
    private readonly userService: UserService,
  ) {}

  /**
   * Маршрут для отправки кода восстановления.
   */
  @Post('/send')
  @ApiOperation({
    operationId: 'forgotPasswordSend',
  })
  @Recaptcha()
  @Public()
  public async send(@Body() body: ForgotPasswordRequest): Promise<void> {
    const user = await this.userService.getConfirmedByEmail(body.email);

    await this.forgotPasswordService.send(user, body.redirectFrom);
  }

  /**
   * Маршрут для смены пароля.
   */
  @Post('/changePassword')
  @ApiOperation({
    operationId: 'forgotPasswordChange',
  })
  @Recaptcha()
  @Public()
  public async change(@Body() body: ChangePasswordRequest): Promise<void> {
    await this.changePasswordService.change(body);
  }
}
