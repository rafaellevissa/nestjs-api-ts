import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ListAddressDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @ApiProperty({ type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
