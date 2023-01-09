import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly first_name: string;
  @IsString()
  readonly last_name: string;
  @IsString()
  readonly username: string;
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  @Min(5)
  readonly hashed_password: string;
  @IsString()
  readonly gender: string;
  @IsNumber()
  readonly socials_id: number;
  // @IsString()
  // readonly photo_file_name: string;
  @IsDateString()
  readonly birthday: Date;
}
