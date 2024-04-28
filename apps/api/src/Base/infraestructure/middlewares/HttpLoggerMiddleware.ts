import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HttpLogger');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, body: reqBody } = request;
    const userAgent = request.get('user-agent') || '';

    if (request.originalUrl === '/status') {
      return next();
    }

    const startTime = Date.now();

    const originalSend = response.send;
    const { statusCode } = response;
    const contentLength = response.get('content-length');

    response.send = (data) => {
      const responseTime = Date.now() - startTime;

      this.logger.log({
        // headers,
        contentLength,
        userAgent,
        ip,
        method,
        url,
        body: reqBody,
        status: statusCode,
        user: 'user' in request ? request.user : undefined,
        responseTime: responseTime + 'ms',
      });

      return originalSend.call(response, data);
    };

    next();
  }
}
