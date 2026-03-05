import { Injectable } from '@nestjs/common';

@Injectable()
export class EmsApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
