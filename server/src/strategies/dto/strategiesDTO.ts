import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined, Min } from 'class-validator';
export class strategiesSingInDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @Min(5)
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
