import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TokenRepository } from './repositories/token.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TokenRepository])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
