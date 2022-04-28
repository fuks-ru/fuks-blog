import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { EncodingService } from '@difuks/common';

import { Role, User } from 'auth-backend/User/entities/User';
import { UserService } from 'auth-backend/User/services/UserService';

@Injectable()
export class EmailRegisterService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Регистрирует пользователя.
   */
  public async register(email: string): Promise<User> {
    const hashedPassword = await this.encodingService.hash(v4());

    const user = new User();

    user.hashedPassword = hashedPassword;
    user.email = email;
    user.role = Role.USER;

    return this.userService.addUserIfNotExists(user);
  }
}
