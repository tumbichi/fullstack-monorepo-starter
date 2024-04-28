import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  override handleRequest(err: Error, user: any, info: unknown) {
    // You can throw an exception based on either "info" or "err" arguments
    if (!user) {
      const error = err || info;
      switch (error?.name) {
        case 'JsonWebTokenError':
        case 'TokenExpiredError':
        case 'TokenNotValidException': {
          throw new UnauthorizedException(error.message);
        }
        default: {
          const errorMessage =
            typeof error.message === 'string' ? error.message : null;
          throw new UnauthorizedException(errorMessage ?? error);
        }
      }
    }
    return user;
  }
}
