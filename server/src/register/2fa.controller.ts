import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';
import { TwoFactorAuthService } from './2fa.service';
import type { Response } from 'express';

@Controller('TwoFactorAuth')
export class TwoFactorAuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly TwofaS: TwoFactorAuthService,
  ) {}

  @Post('2faTurnOn')
  async generateSecret(@Body('username') username: string) {
    const generate = await this.TwofaS.generateSecret(username);
    return generate;
  }

  @Post('2faConfirm')
  async confirm(
    @Body() code: string,
    @Body('username') username: string,
    @Res() res: Response,
  ) {
    const data = await this.TwofaS.confirm(code, username);
    return res.send();
  }
}
