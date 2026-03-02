import { Module, ValidationPipe } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { RegisterModule } from './register/register.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
  ],
  imports: [WebsocketModule, RegisterModule],
})
export class MainModule {}
