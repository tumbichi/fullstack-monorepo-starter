import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { BaseModule } from './Base/BaseModule';
import { AuthenticationModule } from './Authentication/AuthenticationModule';

import { HttpLoggerMiddleware } from './Base/infraestructure/middlewares/HttpLoggerMiddleware';
import PrismaModule from './Base/infraestructure/libs/prisma/PrismaModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'trace' : 'info',
        transport:
          process.env.NODE_ENV === 'development'
            ? { target: 'pino-pretty' }
            : undefined,
        formatters: {
          level(level) {
            return { level };
          },
        },
        autoLogging: false,
        serializers: {
          req: () => undefined,
          res: () => undefined,
        },
      },
    }),
    PrismaModule,
    BaseModule,
    AuthenticationModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
