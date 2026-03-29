import { Module, ValidationPipe } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { RegisterModule } from './register/register.module';
import { APP_PIPE } from '@nestjs/core';
// import { CacheModule } from '@nestjs/cache-manager';
// import { redisStore } from 'cache-manager-redis-yet';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
  ],
  imports: [
    WebsocketModule,
    RegisterModule,
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useFactory: async () => ({
    //     store: await redisStore({
    //       url: 'redis://localhost:6379', // Твой адрес Redis
    //       ttl: 600, // Время жизни кэша в секундах (по умолчанию 10 минут)
    //     }),
    //   }),
    // }),
    AdminPanelModule,
  ],
})
export class MainModule {}
