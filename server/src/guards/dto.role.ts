import * as JWT from 'jsonwebtoken';

export interface MyTokenPayload extends JWT.JwtPayload {
  roles: string[]; // или string, если роль одна
  id: string;
}
