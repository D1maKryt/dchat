import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';
import { authenticator } from '@otplib/preset-v11';
import { toDataURL } from 'qrcode';
import JWT from 'jsonwebtoken';

@Injectable()
export class TwoFactorAuthService {
  constructor(private readonly prisma: PrismaService) {}

  async generateSecret(token: string) {
    if (!token) {
      throw new HttpException('Нет Токена', HttpStatus.FORBIDDEN);
    }
    const decoded = JWT.verify(token, process.env.SECRET!) as any;

    const secret = authenticator.generateSecret();
    const URI = authenticator.keyuri(decoded.id, 'Twoy name', secret);

    await this.prisma.user.update({
      where: { id: decoded.id },
      data: { twoFactorAuthenticationSecret: secret },
    });
    const qrCode = await toDataURL(URI);

    return { secret, qrCode };
  }
}
