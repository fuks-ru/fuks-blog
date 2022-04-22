import { Injectable } from '@nestjs/common';

import { EncodingService } from 'auth-backend/Encoding/services/EncodingService';
import { BasicRegisterRequest } from 'auth-backend/Register/dto/BasicRegisterRequest';
import { Role, User } from 'auth-backend/User/entities/User';
import { UserService } from 'auth-backend/User/services/UserService';

@Injectable()
export class BasicRegisterService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Регистрирует пользователя.
   */
  public async register(registerRequest: BasicRegisterRequest): Promise<User> {
    const hashedPassword = await this.encodingService.hash(
      registerRequest.password,
    );

    const user = new User();

    user.hashedPassword = hashedPassword;
    user.email = registerRequest.email;
    user.role = Role.USER;

    return this.userService.addUser(user);
  }
}
