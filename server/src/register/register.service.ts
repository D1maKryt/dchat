import { HttpStatus, Injectable } from '@nestjs/common';
import type { CreateRegisterDto } from './dto/create-register.dto';
import { Strategies } from 'src/strategies/strategies';
import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';

@Injectable()
export class RegisterService {
  constructor(
    private readonly strategies: Strategies,
    private readonly prisma: PrismaService,
  ) {}

  async register(data: CreateRegisterDto) {
    return this.strategies.singUpByPassword(data);
  }

  async auth(CreateRegisterDto: CreateRegisterDto) {
    return this.strategies.singIn(CreateRegisterDto);
  }

  async checkMe(data: CreateRegisterDto) {
    const findUser = this.prisma.user.findUnique({
      where: { name: data.username },
    });

    if (!findUser) {
      throw new HttpException('Пользователь не найден', HttpStatus.FORBIDDEN);
    }

    return findUser;
  }
}
