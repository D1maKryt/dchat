import { PartialType } from '@nestjs/swagger';
import { CreateAdminPanelDto } from './create-admin-panel.dto';

export class UpdateAdminPanelDto extends PartialType(CreateAdminPanelDto) {}
