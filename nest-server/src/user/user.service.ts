import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getGreet(): string {
    return 'hello nest.';
  }
}
