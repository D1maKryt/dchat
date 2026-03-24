import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateRegisterDto {
  @IsDefined() // Проверяет, что значение не undefined.
  @IsString()
  @IsNotEmpty() // Не может быть пустым
  @ApiProperty() // Для генерации openAPI
  @Length(3, 24)
  username: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(5, 24)
  password: string;
}

export class CreateRegisterAndServesDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Length(3, 24)
  username: string;
  @ApiProperty()
  @IsString()
  @IsOptional() //  Позволяет свойству быть undefined или null, пропуская другие проверки.
  password?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  accessToken?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  refreshToken?: string;
}

export class CreateServerDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Length(3, 24)
  username: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  accessToken: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  refreshToken: string;
}

export class codeDTO {
  @ApiProperty()
  @IsString()
  code?: string;
}
export class DTOConfirm {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Length(3, 24)
  username: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  code: string;
}
