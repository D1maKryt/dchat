import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GuardRegister } from 'src/guards/guards.register';
import { GuardRole } from 'src/guards/guard.role';

import { TwoFactorAuthService } from './2fa.service';
import { DTOConfirm } from './dto/create-register.dto';

@Controller('TwoFactorAuth')
export class TwoFactorAuthController {
  constructor(private readonly TwofaS: TwoFactorAuthService) {}

  @UseGuards(GuardRegister)
  @UseGuards(GuardRole)
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
