import { Test, TestingModule } from '@nestjs/testing';

import { HealthCheckController } from '@api/Base/infraestructure/controllers/HealthCheckController';
import { HealthCheckService } from '@api/Base/application/services/HealthCheckService';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  describe('check server status', () => {
    it('should return OK', () => {
      expect(healthCheckController.sendStatus()).toBe('OK');
    });
  });
});
