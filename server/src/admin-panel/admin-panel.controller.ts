import {
  Controller,
  Get,
  // Post,
  Body,
  Param,
  Delete,
  Put,
  Post,
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

  @Get('User/:id')
  findUser(@Param('id') id: string) {
    return this.adminPanelService.findUser(id);
  }
  @Put('updateUser/:id')
  UpdateUser(@Param('id') id: string, @Body('username') username: string) {
    return this.adminPanelService.updateUser(id, username);
  }

  @Delete('Delete/:id')
  remove(@Param('id') id: string) {
    return this.adminPanelService.remove(id);
  }

  @Post('createRole')
  createRole(@Body('role') data: string) {
    return this.adminPanelService.createRole(data);
  }

  @Post('addRoleUser')
  addRole(
    @Body('rolename') rolename: string,
    @Body('username') username: string,
  ) {
    return this.adminPanelService.addRole(rolename, username);
  }

  @Get('findRoom/:id')
  findRoome(@Param('id') idRoom: string) {
    return this.adminPanelService.findRoom(idRoom);
  }
  @Get('findAllRoom')
  allRoom() {
    return this.adminPanelService.allRoom();
  }

  @Delete('deletRoom')
  DelRoom(@Param('id') idRoom: string) {
    return this.adminPanelService.DelRoom(idRoom);
  }

  @Put('updateRoom/:id')
  UpdateRoom(@Param('id') id: string, @Body('username') roomname: string) {
    return this.adminPanelService.updateRoom(id, roomname);
  }
}
