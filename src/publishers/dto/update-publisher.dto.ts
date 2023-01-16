import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdatePublisherDto {
  @ApiProperty({ example: 'Azon Kitoblar', description: 'Publisher name' })
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiProperty({ example: '991234567', description: 'Publisher phone number' })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @ApiProperty({ example: 'azon@gmail.com', description: 'Publisher email' })
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: 'location', description: 'Publisher location' })
  @IsOptional()
  @IsString()
  readonly location: string;
  @ApiProperty({ example: '1', description: 'Socials id' })
  @IsOptional()
  @IsNumber()
  readonly socials_id: number;
  @ApiProperty({ example: '2', description: 'Book id' })
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
}
