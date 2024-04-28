import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  sendStatus(): string {
    return 'OK';
  }
}
