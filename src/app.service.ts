import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHeath(): string {
    return 'Authentication Service is running!';
  }
}
