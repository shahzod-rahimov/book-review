import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  readonly name: string;
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  @Min(5)
  readonly hashed_password: string;
  @IsString()
  readonly location: string;
  @IsNumber()
  readonly socials_id: number;
  @IsString()
  readonly photo_file_name: string;
  @IsNumber()
  readonly book_id: number;
}
