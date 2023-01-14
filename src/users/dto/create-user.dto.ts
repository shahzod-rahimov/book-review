import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
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
  @Length(5)
  hashed_password: string;
  @IsString()
  readonly gender: string;
  @Type(() => Number)
  @IsNumber()
  readonly socials_id: number;
  // @IsString()
  // readonly photo_file_name: string;
  @Type(() => Date)
  @IsDate()
  readonly birthday: Date;
}
