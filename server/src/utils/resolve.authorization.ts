import { HttpException, HttpStatus } from '@nestjs/common';

export const resolveAuthorization = (authorization: string | undefined) => {
  if (!authorization) {
    throw new HttpException('error', HttpStatus.FORBIDDEN);
  }
  const [, ...tokenData] = authorization.split(' ');
  const token = tokenData.join(' ');
  return token;
};
