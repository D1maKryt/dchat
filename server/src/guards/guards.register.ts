import { Headers, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import JWT from 'jsonwebtoken';

@Injectable()
export class GuardRegister {
  constructor() {}

  VerefiyGuard(@Headers('token') token: string) {
    try {
      JWT.verify(token, process.env.SECRET!);

      return true;
    } catch {
      throw new HttpException('token error', HttpStatus.FORBIDDEN);
    }
  }

  RoleGuard(@Headers('token') token: string) {
    const decoded = JWT.decode(token);
    if (decoded === undefined) {
      throw new HttpException('no decoded token', HttpStatus.FORBIDDEN);
    }
    console.log(decoded);
  }
}
