import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { User } from 'auth-backend/User/entities/User';
import { UserService } from 'auth-backend/User/services/UserService';

@Controller('/user')
@ApiTags('User')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  /**
   * Маршрут для получения всех пользователей.
   */
  @Get('/user/get')
  @ApiOperation({
    operationId: 'userList',
  })
  public async list(): Promise<User[]> {
    return this.userService.getList();
  }
}
