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
  async handleMessage(@MessageBody() massage: SendMessageDTO) {
    const messages = await this.websocketService.SendMessage(massage);
    console.log(messages);

    this.server.emit('OnMassage', { messages });
    return messages;
  }
}
