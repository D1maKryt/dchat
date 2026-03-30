import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.serves';
import { SendMessageDTO, ChatRoom } from './dto/SendMessageDTO';

import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketService {
  constructor(private readonly prisma: PrismaService) {}

  async SendMessage(massage: SendMessageDTO, client: Socket) {
    const massages = await this.prisma.message.create({
      data: {
        content: massage.massage,
        roomId: massage.roomID,
        authorId: massage.authorID,
      },
    });

    client.to(massage.roomID).emit('msg', massages);
    return massages;
  }

  async create(data: string, @ConnectedSocket() client: Socket) {
    const room = (await this.prisma.chatRoom.findUnique({
      where: { id: data },
    })) as ChatRoom | null;

    if (room) {
      throw new HttpException(
        'Такая комната уже существует',
        HttpStatus.FORBIDDEN,
      );
    }
    const roomID = data;
    const create = await this.prisma.chatRoom.create({
      data: { name: roomID },
    });

    await client.join(roomID);

    return create;
  }

  async join(id: string, @ConnectedSocket() client: Socket) {
    const room = (await this.prisma.chatRoom.findFirst({
      where: { id: id },
    })) as ChatRoom | null;

    if (!room) {
      throw new HttpException(
        'Такая комната не существует',
        HttpStatus.FORBIDDEN,
      );
    }

    const user_join = client.join(id);
    return user_join;
  }
}
