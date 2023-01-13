import { IsPhoneNumber, IsString, Length, Min } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  readonly first_name: string;
  @IsString()
  readonly last_name: string;
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @IsString()
  @Length(5, 15, {
    message: "Parolning uzunligi 5 dan katta 15 dan kichik bo'lishi kerak",
  })
  hashed_password: string;
}
