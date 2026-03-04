import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';
import { authenticator } from '@otplib/preset-v11';
import { toDataURL } from 'qrcode';

@Injectable()
export class TwoFactorAuthService {
  constructor(private readonly prisma: PrismaService) {}

  async generateSecret(username: string) {
    console.log(username);
    const user = await this.prisma.user.findUnique({
      where: { name: username },
    });
    if (!user) {
      throw new HttpException('Юзер не найден', HttpStatus.FORBIDDEN);
    }

    const secret = authenticator.generateSecret();
    const URI = authenticator.keyuri(username, 'Twoy name', secret);

    await this.prisma.user.update({
      where: { name: user.name },
      data: {
        twoFactorAuthenticationSecret: secret,
        isTwoFactorAuthenticationEnabled: false,
      },
    });
    const qrCode = await toDataURL(URI);

    return { secret, qrCode };
  }

  async confirm(code: string, username: string) {
    const user = await this.prisma.user.findFirst({
      where: { name: username },
      select: {
        twoFactorAuthenticationSecret: true, // наш секрет
        isTwoFactorAuthenticationEnabled: true, // включен или нет
      },
    });
    if (!user?.twoFactorAuthenticationSecret) {
      throw new HttpException(
        'Вы не попытались включить 2fa',
        HttpStatus.FORBIDDEN,
      );
    }
    if (!user) {
      throw new HttpException('Такого пользователя нету', HttpStatus.FORBIDDEN);
    }

    const isValid = await authenticator.verify({
      token: code,
      secret: user.twoFactorAuthenticationSecret,
    });
    if (isValid === false) {
      throw new HttpException('неверный код', HttpStatus.FORBIDDEN);
    }
    const updateUser = await this.prisma.user.update({
      where: { name: username },
      data: { isTwoFactorAuthenticationEnabled: true },
    });

    return;
  }

  async Verefication(username: string, code?: string) {
    if (!code) {
      throw new HttpException('Вы не ввели 2fa код', HttpStatus.FORBIDDEN);
    }
    const pretendent = await this.prisma.user.findUnique({
      where: { name: username },
    });
    if (!pretendent?.twoFactorAuthenticationSecret) {
      throw new HttpException('Вы не ввели 2fa код', HttpStatus.FORBIDDEN);
    }

    const isValid = await authenticator.verify({
      token: code,
      secret: pretendent?.twoFactorAuthenticationSecret,
    });

    return pretendent;
  }
}
