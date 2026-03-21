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
    const users = await this.prisma.user.findMany();
    return users;
  }

  async update(id: string, username: string) {
    const pretendent = await this.prisma.user.findUnique({ where: { id: id } });
    if (!pretendent) {
      throw new HttpException('Пользователь не найден', HttpStatus.FORBIDDEN);
    }
    const newUser = this.prisma.user.update({
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
}
