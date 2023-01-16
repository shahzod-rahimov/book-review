import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublisherDto {
  @ApiProperty({ example: 'Azon Kitoblar', description: 'Publisher name' })
  @IsString()
  readonly name: string;
  @ApiProperty({ example: '991234567', description: 'Publisher phone number' })
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @ApiProperty({ example: 'azon@gmail.com', description: 'Publisher email' })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: '1234567', description: 'Publisher password' })
  @IsString()
  @Length(5)
  hashed_password: string;
  @ApiProperty({ example: 'location', description: 'Publisher location' })
  @IsString()
  readonly location: string;
  @ApiProperty({ example: '1', description: 'Socials id' })
  @Type(() => Number)
  @IsNumber()
  readonly socials_id: number;
  @ApiProperty({ example: '2', description: 'Book id' })
  @Type(() => Number)
  @IsNumber()
  readonly book_id: number;
}
