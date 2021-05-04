import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUserByTokenStr(@Query('token') token: string) {
    return this.userService.getUserByToken(token);
  }
}
