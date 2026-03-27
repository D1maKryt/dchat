import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { resolveAuthorization } from 'src/utils/resolve.authorization';
import JWT from 'jsonwebtoken';

@Injectable()
export class GatWayGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    const ClearToken = resolveAuthorization(token);

    const payload = JWT.verify(ClearToken, process.env.SECRET!);
    console.log(payload);

    return true;
  }
}
