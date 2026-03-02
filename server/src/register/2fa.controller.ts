import { Body, Controller, Headers, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';
import { TwoFactorAuthService } from './2fa.service';

@Controller('TwoFactorAuth')
export class TwoFactorAuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly TwofaS: TwoFactorAuthService,
  ) {}

  @Post('generate')
  async generateSecret(@Headers('authorization') JWT: string) {
    const clearToken = JWT.split(' ')[1];

    const generate = await this.TwofaS.generateSecret(clearToken);
    return generate;
  }
}
