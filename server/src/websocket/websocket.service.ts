import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';
import { SendMessageDTO } from './dto/SendMessageDTO';

@Injectable()
export class WebsocketService {
  constructor(private readonly prisma: PrismaService) {}

  async SendMessage(dto: SendMessageDTO) {
    const massages = await this.prisma.chat.create({
      data: { massage: dto.massage },
    });
    return massages;
  }
}
