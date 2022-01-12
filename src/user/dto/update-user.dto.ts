import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  password?: string;

  @ApiProperty({ type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  cpf?: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  zip_code?: string;
}
