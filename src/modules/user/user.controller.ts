import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('verifyToken')
  async getUserByTokenStr(@Payload() token: string): Promise<IUser> {
    return await this.userService.getUserByToken(token);
  }
}
