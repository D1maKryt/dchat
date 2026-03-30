import * as JWT from 'jsonwebtoken';

export interface MyTokenPayload extends JWT.JwtPayload {
  roles: string[];
  id: string;
}

export interface MyTokenPayloadAdmin extends JWT.JwtPayload {
  roleAdmin: string[];
  id: string;
}
