import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
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
  async handleMessage(
    @MessageBody() massage: SendMessageDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const messages = await this.websocketService.SendMessage(massage, client);

    return messages;
  }

  @SubscribeMessage('create')
  async new_room(@MessageBody() data: string) {
    const createRoom = await this.websocketService.create(data);
    return createRoom;
  }

  @SubscribeMessage('join')
  async join(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    const join = await this.websocketService.join(data, client);
    return join;
  }
}
