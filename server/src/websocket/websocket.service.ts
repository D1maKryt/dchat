import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';
import { SendMessageDTO, ChatRoom } from './dto/SendMessageDTO';
import { v4 as uuid } from 'uuid';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketService {
  constructor(private readonly prisma: PrismaService) {}

  async SendMessage(
    massage: SendMessageDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const massages = await this.prisma.chat.create({
      data: { massage: massage.massage },
    });

    client.to('').emit('msg', massages);
    return massages;
  }

  async create(data: string) {
    const room = (await this.prisma.chatRoom.findFirst({
      where: { roomeID: data },
    })) as ChatRoom | null;

    if (room) {
      throw new HttpException(
        'Такая комната уже существует',
        HttpStatus.FORBIDDEN,
      );
    }

    const roomID = uuid();

    const create = await this.prisma.chatRoom.create({
      data: { roomeID: roomID },
    });

    return create;
  }

  async join(data: string, @ConnectedSocket() client: Socket) {
    const room = (await this.prisma.chatRoom.findFirst({
      where: { roomeID: data },
    })) as ChatRoom | null;

    if (room) {
      throw new HttpException(
        'Такая комната уже существует',
        HttpStatus.FORBIDDEN,
      );
    }

    const user_join = client.join(data);
    return user_join;
  }
}
