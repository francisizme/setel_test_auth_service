import { Connection, EntityRepository, Repository } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

import { Token } from '../entities/token.entity';

import { IToken } from '../interfaces/token.interface';

@EntityRepository(Token)
export class TokenRepository extends Repository<IToken> {
  constructor(@InjectConnection() private readonly connection: Connection) {
    super();
  }
}
