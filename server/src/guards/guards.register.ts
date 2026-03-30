// import {
//   Headers,
//   // HttpException,
//   // HttpStatus,
//   Injectable,
//   ExecutionContext,
//   CanActivate,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';

// // import JWT from 'jsonwebtoken';

// @Injectable()
// export class GuardRegister implements CanActivate {
//   constructor() {}

//   VerefiyGuard(context: ExecutionContext) {
//     try {
//       const request = context.switchToHttp().getRequest();

//       JWT.verify(token, process.env.SECRET!);

//       return true;
//     } catch {
//       throw new HttpException('token error', HttpStatus.FORBIDDEN);
//     }
//   }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import JWT from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { resolveAuthorization } from 'src/utils/resolve.authorization';

@Injectable()
export class GuardRegister implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    const ClearToken = resolveAuthorization(token);

    JWT.verify(ClearToken, process.env.SECRET!);

    return true;
  }
}
