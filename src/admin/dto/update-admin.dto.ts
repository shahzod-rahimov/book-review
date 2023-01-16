import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString, Min } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ example: 'admin', description: "Admin's first name" })
  @IsOptional()
  @IsString()
  readonly first_name: string;
  @ApiProperty({ example: 'adminov', description: "Admin's last name" })
  @IsOptional()
  @IsString()
  readonly last_name: string;
  @ApiProperty({ example: '991234567', description: "Admin's phone number" })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
}
