import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';
import { TwoFactorAuthService } from './2fa.service';
import { DTOConfirm } from './dto/create-register.dto';

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
  async confirm(@Body() { username, code }: DTOConfirm) {
    const data = await this.TwofaS.confirm(code, username);
    return data;
  }
}
