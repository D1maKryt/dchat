import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined, Length } from 'class-validator';
export class strategiesSingInDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @Length(3, 24)
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  accessToken: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  refreshToken: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  providerId: string;
}
