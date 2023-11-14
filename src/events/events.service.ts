import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  demo(): string {
    return 'Hello, i am events';
  }
}
