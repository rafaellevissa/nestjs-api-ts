import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
