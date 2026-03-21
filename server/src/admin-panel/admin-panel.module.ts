import { Module } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { AdminPanelController } from './admin-panel.controller';
import { PrismaService } from 'src/prisma/prisma.serves';

@Module({
  controllers: [AdminPanelController],
  providers: [AdminPanelService, PrismaService],
})
export class AdminPanelModule {}
