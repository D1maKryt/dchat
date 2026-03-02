import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { PrismaService } from 'src/prisma/prisma.serves';
import { GoogleStrategy } from 'src/strategies/auth.strategi';
import { Strategies } from 'src/strategies/strategies';
import { TwoFactorAuthService } from './2fa.service';
import { TwoFactorAuthController } from './2fa.controller';

@Module({
  controllers: [RegisterController, TwoFactorAuthController],
  providers: [
    RegisterService,
    PrismaService,
    GoogleStrategy,
    Strategies,
    TwoFactorAuthService,
  ],
})
export class RegisterModule {}
