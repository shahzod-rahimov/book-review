import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginPublisherDto {
  @ApiProperty({ example: '991234567', description: 'Publisher phone number' })
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @ApiProperty({ example: '1234567', description: 'Publisher password' })
  @IsString()
  readonly password: string;
}
