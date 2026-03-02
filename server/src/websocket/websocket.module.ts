import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { PrismaService } from 'src/prisma/prisma.serves';

@Module({
  providers: [WebsocketGateway, WebsocketService, PrismaService],
})
export class WebsocketModule {}
