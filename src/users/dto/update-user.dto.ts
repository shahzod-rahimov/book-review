import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly first_name: string;
  @IsOptional()
  @IsString()
  readonly last_name: string;
  @IsOptional()
  @IsString()
  readonly username: string;
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsString()
  readonly gender: string;
  @IsOptional()
  @IsNumber()
  readonly socials_id: number;
  // @IsString()
  // readonly photo_file_name: string;
  @IsOptional()
  @IsDateString()
  readonly birthday: Date;
}
