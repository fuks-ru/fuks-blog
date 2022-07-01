import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiOkResponse({
    type: User,
    isArray: true,
  })
  public async list(): Promise<User[]> {
    return this.userService.getList();
  }
}
