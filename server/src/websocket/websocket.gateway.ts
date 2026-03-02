import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { SendMessageDTO } from './dto/SendMessageDTO';

import { Server, Socket } from 'socket.io';
import { log } from 'node:console';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly websocketService: WebsocketService) {}

  handleConnection(client: Socket) {
    console.log('Conection server', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Disconection server', client.id);
  }

  @SubscribeMessage('send')
  async handleMessage(@MessageBody() dto: SendMessageDTO) {
    console.log(dto);
    const message = await this.websocketService.SendMessage(dto);

    return message;

    // this.server.emit('', message);
  }
}
