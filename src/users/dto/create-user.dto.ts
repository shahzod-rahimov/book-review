import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: "Users's first name" })
  @IsString()
  readonly first_name: string;
  @ApiProperty({ example: 'userov', description: "Users's last name" })
  @IsString()
  readonly last_name: string;
  @ApiProperty({ example: 'userbek', description: "Users's username" })
  @IsString()
  readonly username: string;
  @ApiProperty({ example: '991234567', description: "Users's phone number" })
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @ApiProperty({ example: 'user@gmail.com', description: "Users's email" })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: '1234567', description: "Users's password" })
  @IsString()
  @Length(5)
  hashed_password: string;
  @ApiProperty({ example: 'erkak', description: "Users's gender" })
  @IsString()
  readonly gender: string;
  @ApiProperty({ example: '1', description: "Users's social id" })
  @Type(() => Number)
  @IsNumber()
  readonly socials_id: number;
  @ApiProperty({ example: '12/01/2000', description: "Users's birthday" })
  @Type(() => Date)
  @IsDate()
  readonly birthday: Date;
}
