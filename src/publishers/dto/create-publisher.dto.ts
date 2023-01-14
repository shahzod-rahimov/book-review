import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreatePublisherDto {
  @IsString()
  readonly name: string;
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  @Length(5)
  hashed_password: string;
  @IsString()
  readonly location: string;
  @Type(() => Number)
  @IsNumber()
  readonly socials_id: number;
  // @IsString()
  // readonly photo_file_name: string;
  @Type(() => Number)
  @IsNumber()
  readonly book_id: number;
}
