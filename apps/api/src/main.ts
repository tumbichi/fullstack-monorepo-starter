import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';

import { AppModule } from './AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  const logger = new Logger('main');

  app.useLogger(app.get(PinoLogger));

  app.enableCors();

  await app.listen(port).then(() => {
    logger.log(`Listening on port ${port}`);
  });
}
bootstrap();
