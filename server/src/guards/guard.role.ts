import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import JWT from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { resolveAuthorization } from 'src/utils/resolve.authorization';
import { MyTokenPayload } from './dto.role';

@Injectable()
export class GuardRole implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    const ClearToken = resolveAuthorization(token);

    const decoded = JWT.verify(
      ClearToken,
      process.env.SECRET!,
    ) as MyTokenPayload;

    return decoded.roles.includes('User');
  }
}
