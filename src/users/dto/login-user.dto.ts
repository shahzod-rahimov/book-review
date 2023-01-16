import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: '991234567', description: "Users's phone number" })
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @ApiProperty({ example: '1234567', description: "Users's password" })
  @IsString()
  readonly password: string;
}
