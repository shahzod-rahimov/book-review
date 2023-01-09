import { IsPhoneNumber, IsString, Min } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  readonly first_name: string;
  @IsString()
  readonly last_name: string;
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @IsString()
  @Min(5, { message: 'Password is too short!' })
  readonly hashed_password: string;
}
