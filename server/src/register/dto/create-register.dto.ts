import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateRegisterDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateRegisterAndServesDTO {
  username: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}

export class CreateServerDTO {
  username: string;
  accessToken: string;
  refreshToken: string;
}
