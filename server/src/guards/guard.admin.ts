import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import JWT from 'jsonwebtoken';

import { Request } from 'express';
import { resolveAuthorization } from 'src/utils/resolve.authorization';
import { MyTokenPayloadAdmin } from './dto/dto.role';

@Injectable()
export class GuardAdmin implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    const ClearToken = resolveAuthorization(token);

    const decoded = JWT.verify(
      ClearToken,
      process.env.SECRET!,
    ) as MyTokenPayloadAdmin;

    if (!decoded.roleAdmin.includes('8f2d2296-f915-42d7-9f51-cbe5f076bc32')) {
      throw new HttpException('Error role Admin', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
