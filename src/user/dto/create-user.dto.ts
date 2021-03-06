import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  zip_code: string;
}
