import { Module } from '@nestjs/common';

import { HealthCheckController } from './infraestructure/controllers/HealthCheckController';
import { HealthCheckService } from './application/services/HealthCheckService';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class BaseModule {}
