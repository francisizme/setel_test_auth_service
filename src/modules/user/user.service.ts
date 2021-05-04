import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TokenRepository } from './repositories/token.repository';

import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TokenRepository)
    private readonly tokenRepository: TokenRepository,
  ) {}

  async getUserByToken(tokenStr: string): Promise<IUser> {
    const token = await this.tokenRepository.findOne({
      where: { token: tokenStr },
      relations: ['user'],
    });
    if (!token) {
      return null;
    }

    return token.user;
  }
}
