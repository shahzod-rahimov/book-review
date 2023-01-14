import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginPublisherDto {
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @IsString()
  readonly password: string;
}
