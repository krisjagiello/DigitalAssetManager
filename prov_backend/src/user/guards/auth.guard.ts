import { ExpressRequest } from '@app/types/expressRequest.interface';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    if (request.user) {
      console.log('HAVE USER');
      return true;
    }

    console.log('NO USER OOPS');

    // This exception seem to be caught and different exception rethrown
    throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    console.log('Exception not thrown');
  }
}
