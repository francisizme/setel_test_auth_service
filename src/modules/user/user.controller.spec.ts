import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { IUser } from './interfaces/user.interface';

class UserServiceFake {
  async getUserByToken(): Promise<void> {}
}

describe('UserController', () => {
  let controller: UserController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceFake,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return User', async () => {
    const token = faker.git.shortSha();
    const d = new Date();
    const userData: IUser = {
      username: faker.internet.userName(),
      id: 1,
      full_name: faker.name.firstName(),
      created_at: d,
      updated_at: d,
    };

    const spyFn = jest
      .spyOn(service, 'getUserByToken')
      .mockResolvedValue(userData);

    const user = await controller.getUserByTokenStr(token);

    expect(spyFn).toBeCalledWith(token);
    expect(user).toBe(userData);
  });

  it('should return null', async () => {
    const token = faker.git.shortSha();

    const spyFn = jest.spyOn(service, 'getUserByToken').mockResolvedValue(null);

    const user = await controller.getUserByTokenStr(token);

    expect(spyFn).toBeCalledWith(token);
    expect(user).toBe(null);
  });
});
