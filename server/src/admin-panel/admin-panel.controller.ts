import {
  Controller,
  Get,
  // Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
// import { CreateAdminPanelDto } from './dto/create-admin-panel.dto';
// import { UpdateAdminPanelDto } from './dto/update-admin-panel.dto';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  // @Post('addOwner')
  // create(@Body() createAdminPanelDto: CreateAdminPanelDto) {
  //   return this.adminPanelService.create(createAdminPanelDto);
  // }

  @Get('allUsers')
  findAll() {
    return this.adminPanelService.findAll();
  }

  @Put('updateUser/:id')
  Update(@Param('id') id: string, @Body('username') username: string) {
    return this.adminPanelService.update(id, username);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminPanelService.remove(id);
  }
}
