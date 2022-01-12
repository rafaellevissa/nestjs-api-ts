import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ListAddressDto } from './list-address.dto';

export class ListUserDto {
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

  @ApiProperty({ type: ListAddressDto })
  @IsObject()
  address: ListAddressDto;
}
