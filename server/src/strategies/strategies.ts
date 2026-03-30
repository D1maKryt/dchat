import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';
import {
  CreateRegisterAndServesDTO,
  CreateRegisterDto,
  CreateServerDTO,
} from '../register/dto/create-register.dto';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { TwoFactorAuthService } from 'src/register/2fa.service';

@Injectable()
export class Strategies {
  constructor(
    private readonly prisma: PrismaService,
    private readonly TwoFa: TwoFactorAuthService,
  ) {}

  async singUpByPassword(user: CreateRegisterDto) {
    const passwordHash = bcrypt.hashSync(user.password, 7);
    const username = user.username;
    return this.singUp({ username: username, password: passwordHash });
  }

  async singUp({
    username: name,
    accessToken,
    refreshToken,
    password,
  }: CreateRegisterAndServesDTO) {
    const pretendent = await this.prisma.user.findUnique({
      where: { name: name },
    });
    if (pretendent) {
      console.log(pretendent);
      throw new HttpException('User уже создан', HttpStatus.FORBIDDEN);
    }

    const id = uuid();

    const generatedToken = JWT.sign(
      {
        id: id,
        roles: 'fd0c226e-25ce-4c1b-a016-db91e2248934',
        roleAdmin: '8f2d2296-f915-42d7-9f51-cbe5f076bc32',
      },
      process.env.SECRET!,
      {
        expiresIn: '1h',
      },
    );

    const createdUser = await this.prisma.user.create({
      data: {
        id: id,
        name: name,
        password: password,
        Token: generatedToken,
        accessToken: accessToken,
        refreshToken: refreshToken,
        roles: {
          create: {
            role: { connect: { id: 'fd0c226e-25ce-4c1b-a016-db91e2248934' } },
          },
        },
      },
    });
    return createdUser;
  }

  async singIn({ username, password }: CreateRegisterDto, code?: string) {
    const pretendent = await this.prisma.user.findUnique({
      where: { name: username },
    });

    if (!pretendent)
      throw new HttpException(
        'Пользователь не зарегистрирован',
        HttpStatus.FORBIDDEN,
      );

    if (!pretendent.password) {
      throw new HttpException('Пароля нет', HttpStatus.FORBIDDEN);
    }

    const comparePassword = await bcrypt.compare(password, pretendent.password);

    if (comparePassword === false) {
      throw new HttpException('Пароль неверный', HttpStatus.FORBIDDEN);
    }
    if (pretendent.isTwoFactorAuthenticationEnabled === true) {
      return this.TwoFa.Verefication(username, code);
    }
    return pretendent;
  }

  async singInServes({
    username,
    accessToken,
    refreshToken,
  }: CreateRegisterAndServesDTO) {
    const pretendent = await this.prisma.user.findUnique({
      where: { name: username },
    });

    if (!pretendent) {
      throw new HttpException(
        'Пользователя несуществует',
        HttpStatus.FORBIDDEN,
      );
    }
    const userUpdete = this.prisma.user.update({
      where: { name: username },
      data: { accessToken: accessToken, refreshToken: refreshToken },
    });

    return userUpdete;
  }
  // найти примeнение?

  async singUpServes(user: CreateServerDTO) {
    const pretendent = await this.prisma.user.findUnique({
      where: { name: user.username },
    });
    if (pretendent) {
      throw new HttpException('User уже создан', HttpStatus.FORBIDDEN);
    }
    return this.singUp(user);
  }
}
