import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { GuardRegister } from 'src/guards/guards.register';
import { GuardAdmin } from 'src/guards/guard.admin';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  // @Post('addOwner')
  // create(@Body() createAdminPanelDto: CreateAdminPanelDto) {
  //   return this.adminPanelService.create(createAdminPanelDto);
  // }
  //User
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Get('allUsers')
  findAll() {
    return this.adminPanelService.findAll();
  }
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Get('findUser/:id')
  findUser(@Param('id') id: string) {
    return this.adminPanelService.findUser(id);
  }
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Put('updateUser/:id')
  UpdateUser(@Param('id') id: string, @Body('username') username: string) {
    return this.adminPanelService.updateUser(id, username);
  }
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Delete('AllDeleteUser')
  removeAll() {
    return this.adminPanelService.AllDeleteUser();
  }
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Delete('UserDelete/:id')
  remove(@Param('id') id: string) {
    return this.adminPanelService.remove(id);
  }
  //Role
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Post('createRole')
  createRole(@Body('role') data: string) {
    return this.adminPanelService.createRole(data);
  }
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Post('addRoleUser')
  addRole(
    @Body('rolename') rolename: string,
    @Body('username') username: string,
  ) {
    return this.adminPanelService.addRole(rolename, username);
  }
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Get('findAllRoleUser')
  findallRole() {
    return this.adminPanelService.findAllRoleUser();
  }

  //Room
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Get('findRoom/:id')
  findRoome(@Param('id') idRoom: string) {
    return this.adminPanelService.findRoom(idRoom);
  }
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Get('findAllRoom')
  allRoom() {
    return this.adminPanelService.allRoom();
  }
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Delete('deletRoom/:id')
  DelRoom(@Param('id') idRoom: string) {
    return this.adminPanelService.DelRoom(idRoom);
  }
  @UseGuards(GuardAdmin)
  @UseGuards(GuardRegister)
  @Put('updateRoom/:id')
  UpdateRoom(@Param('id') id: string, @Body('roomname') roomname: string) {
    return this.adminPanelService.updateRoom(id, roomname);
  }
}
