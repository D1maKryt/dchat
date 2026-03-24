import { Module } from '@nestjs/common';
import { GuardRegister } from './guards.register';

@Module({ providers: [GuardRegister] })
export class GuardsModule {}
