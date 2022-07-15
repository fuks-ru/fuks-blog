import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from 'auth-backend/Auth/decorators/Roles';
import { UserResponse } from 'auth-backend/User/dto/UserResponse';
import { UserUpdateRequest } from 'auth-backend/User/dto/UserUpdateRequest';
import { Role, User } from 'auth-backend/User/entities/User';
import { UserService } from 'auth-backend/User/services/UserService';

@Controller('/user')
@ApiTags('User')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  /**
   * Маршрут для получения всех пользователей.
   */
  @Get('/get')
  @ApiOperation({
    operationId: 'userList',
  })
  @ApiOkResponse({
    type: UserResponse,
    isArray: true,
  })
  public async list(): Promise<UserResponse[]> {
    const userList = await this.userService.getList();

    return userList.map((user) => this.getUserResponse(user));
  }

  /**
   * Маршрут для обновления пользователя.
   */
  @Patch('/:id')
  @ApiOperation({
    operationId: 'userUpdate',
  })
  @ApiOkResponse({
    type: UserResponse,
  })
  @Roles(Role.ADMIN)
  public async update(
    @Body() body: UserUpdateRequest,
    @Param('id') id: string,
  ): Promise<UserResponse> {
    const user = await this.userService.addOrUpdateUser({
      id,
      ...body,
    });

    return this.getUserResponse(user);
  }

  /**
   * Маршрут для удаления пользователя.
   */
  @Delete('/:id')
  @ApiOperation({
    operationId: 'userDelete',
  })
  @ApiParam({ name: 'id', required: true, schema: { type: 'string' } })
  @Roles(Role.ADMIN)
  public delete(@Param('id') id: string): Promise<void> {
    return this.userService.deleteById(id);
  }

  private getUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      role: user.role,
      email: user.email,
      isConfirmed: user.isConfirmed,
    };
  }
}
