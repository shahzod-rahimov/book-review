import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdatePublisherDto {
  @IsOptional()
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsString()
  readonly location: string;
  @IsOptional()
  @IsNumber()
  readonly socials_id: number;
  @IsOptional()
  @IsString()
  readonly photo_file_name: string;
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
}
