import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from 'auth-backend/Auth/decorators/Public';
import { ConfirmRequest } from 'auth-backend/Register/modules/EmailVerify/dto/ConfirmRequest';
import { ConfirmationService } from 'auth-backend/Register/modules/EmailVerify/services/ConfirmationService';

@Controller('/confirmation')
@ApiTags('Confirmation')
export class ConfirmationController {
  public constructor(
    private readonly confirmationService: ConfirmationService,
  ) {}

  /**
   * Маршрут для подтверждения email.
   */
  @Post('/confirm')
  @ApiOperation({
    operationId: 'confirmationConfirm',
  })
  @Public()
  public async confirm(@Body() body: ConfirmRequest): Promise<void> {
    await this.confirmationService.confirm(body.confirmCode);
  }
}
