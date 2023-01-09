import { IsOptional, IsPhoneNumber, IsString, Min } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  readonly first_name: string;
  @IsOptional()
  @IsString()
  readonly last_name: string;
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @IsOptional()
  @IsString()
  @Min(5, { message: 'Password is too short!' })
  readonly hashed_password: string;
}
