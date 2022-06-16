import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ConfirmRequest } from 'auth-backend/EmailVerify/dto/ConfirmRequest';
import { ConfirmationService } from 'auth-backend/EmailVerify/services/ConfirmationService';

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
  public async confirm(@Body() body: ConfirmRequest): Promise<void> {
    await this.confirmationService.confirm(body.confirmCode);
  }
}
