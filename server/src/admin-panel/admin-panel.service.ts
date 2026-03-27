import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateAdminPanelDto } from './dto/create-admin-panel.dto';
// import { UpdateAdminPanelDto } from './dto/update-admin-panel.dto';
import { PrismaService } from 'src/prisma/prisma.serves';

@Injectable()
export class AdminPanelService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createAdminPanelDto: CreateAdminPanelDto) {
  //   return 'This action adds a new adminPanel';
  // }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async updateUser(id: string, username: string) {
    const pretendent = await this.prisma.user.findUnique({ where: { id: id } });
    if (!pretendent) {
      throw new HttpException('Пользователь не найден', HttpStatus.FORBIDDEN);
    }
    const newUser = await this.prisma.user.update({
      where: { id: id },
      data: { name: username },
    });

    return newUser;
  }

  async remove(id: string) {
    const pretendent = await this.prisma.user.findUnique({ where: { id: id } });
    if (!pretendent) {
      throw new HttpException('Пользователь не найден', HttpStatus.FORBIDDEN);
    }
    const delUser = this.prisma.user.delete({ where: { id: id } });
    return delUser;
  }

  async findUser(data: string) {
    const user = await this.prisma.user.findUnique({ where: { id: data } });
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async createRole(rolename: string) {
    const role = await this.prisma.role.create({ data: { name: rolename } });

    return role;
  }
  async addRole(rolename: string, username: string) {
    const role = await this.prisma.role.findUnique({
      where: { name: rolename },
    });

    if (!role) {
      throw new HttpException('Роли не существует', HttpStatus.FORBIDDEN);
    }
    const user = await this.prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      throw new HttpException(
        'Пользователя не существует',
        HttpStatus.FORBIDDEN,
      );
    }
    const create = await this.prisma.usersOnRoles.create({
      data: { roleId: role.id, userId: user.id },
    });

    return create;
  }

  async findRoom(idRoome: string) {
    const room = await this.prisma.chatRoom.findFirst({
      where: { name: idRoome },
    });

    if (!room) {
      throw new HttpException('Такой комнаты нет', HttpStatus.FORBIDDEN);
    }
    return room;
  }

  async allRoom() {
    return await this.prisma.chatRoom.findMany();
  }

  async DelRoom(idRoome: string) {
    const room = await this.prisma.chatRoom.findFirst({
      where: { name: idRoome },
    });

    if (!room) {
      throw new HttpException('Такой комнаты нет', HttpStatus.FORBIDDEN);
    }

    return await this.prisma.chatRoom.delete({ where: { id: idRoome } });
  }

  async updateRoom(id: string, roomname: string) {
    const room = await this.prisma.chatRoom.findFirst({
      where: { id: id },
    });
    if (!room) {
      throw new HttpException('Комната  не найдена', HttpStatus.FORBIDDEN);
    }
    const newRoom = await this.prisma.chatRoom.update({
      where: { id: id },
      data: { name: roomname },
    });

    return newRoom;
  }
}
