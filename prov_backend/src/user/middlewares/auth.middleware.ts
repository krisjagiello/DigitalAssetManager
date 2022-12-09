import { UserService } from '@app/user/user.service';
import { JWT_SECRET } from './../../config';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    console.log('authMiddleware', req.headers);
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1]; // Take second element
    console.log('Token ', token);

    try {
      const decode = verify(token, JWT_SECRET);
      console.log('decode ', decode);
      const user = await this.userService.findById(decode.id);
      req.user = user;
    } catch (err) {
      req.user = null;
      next();
    }

    next(); // Don't need that??
  }
}
