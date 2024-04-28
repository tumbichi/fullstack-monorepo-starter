import { Controller, Get } from '@nestjs/common';

import { HealthCheckService } from '../../application/services/HealthCheckService';

@Controller('status')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  sendStatus(): string {
    return this.healthCheckService.sendStatus();
  }
}
