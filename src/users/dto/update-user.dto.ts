import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'user', description: "Users's first name" })
  @IsOptional()
  @IsString()
  readonly first_name: string;
  @ApiProperty({ example: 'userov', description: "Users's last name" })
  @IsOptional()
  @IsString()
  readonly last_name: string;
  @ApiProperty({ example: 'userbek', description: "Users's username" })
  @IsOptional()
  @IsString()
  readonly username: string;
  @ApiProperty({ example: '991234567', description: "Users's phone number" })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @ApiProperty({ example: 'user@gmail.com', description: "Users's email" })
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: 'erkak', description: "Users's gender" })
  @IsOptional()
  @IsString()
  readonly gender: string;
  @ApiProperty({ example: '1', description: "Users's social id" })
  @IsOptional()
  @IsNumber()
  readonly socials_id: number;
  @ApiProperty({ example: '12/01/2000', description: "Users's birthday" })
  @IsOptional()
  @IsDateString()
  readonly birthday: Date;
}
