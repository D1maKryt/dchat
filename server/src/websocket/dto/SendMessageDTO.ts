import { ApiProperty } from '@nestjs/swagger';
export class SendMessageDTO {
  @ApiProperty()
  massage: string;
  @ApiProperty()
  roomID: string;
  @ApiProperty()
  authorID: string;
}

export class ChatRoom {
  @ApiProperty()
  id: number;
  @ApiProperty()
  roomeID: string;
}

export class TKChat {
  @ApiProperty()
  id: string;
}
