import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  access_token: string;
}
