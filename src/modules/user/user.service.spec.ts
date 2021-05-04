import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from './user.service';

import { Token } from './entities/token.entity';

import { IToken } from './interfaces/token.interface';

class TokenRepositoryFake {
  async findOne(): Promise<void> {}
}

describe('UserService', () => {
  let service: UserService;
  let tokenRepository: Repository<IToken>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Token),
          useClass: TokenRepositoryFake,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    tokenRepository = module.get<Repository<IToken>>(getRepositoryToken(Token));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return User', async () => {
    const token = faker.git.shortSha();
    const d = new Date();
    const tokenData: IToken = {
      id: 1,
      token,
      created_at: d,
      user: {
        username: faker.internet.userName(),
        id: 1,
        full_name: faker.name.firstName(),
        created_at: d,
        updated_at: d,
      },
    };

    const findOneSpy = jest
      .spyOn(tokenRepository, 'findOne')
      .mockResolvedValue(tokenData);

    const user = await service.getUserByToken(token);

    expect(findOneSpy).toBeCalledWith({
      where: { token },
      relations: ['user'],
    });
    expect(user).toBe(tokenData.user);
  });

  it('should return empty User', async () => {
    const token = faker.git.shortSha();
    const findOneSpy = jest
      .spyOn(tokenRepository, 'findOne')
      .mockResolvedValue(null);

    const user = await service.getUserByToken(token);

    expect(findOneSpy).toBeCalledWith({
      where: { token },
      relations: ['user'],
    });
    expect(user).toBeNull();
  });
});
