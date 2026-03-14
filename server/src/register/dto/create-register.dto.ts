import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateRegisterDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class CreateRegisterAndServesDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  accessToken?: string;
  @ApiProperty()
  refreshToken?: string;
}

export class CreateServerDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}

export class codeDTO {
  @ApiProperty()
  code?: string;
}
export class DTOConfirm {
  username: string;
  code: string;
}
