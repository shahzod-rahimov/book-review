import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, Length, Min } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'admin', description: "Admin's first name" })
  @IsString()
  readonly first_name: string;
  @ApiProperty({ example: 'adminov', description: "Admin's last name" })
  @IsString()
  readonly last_name: string;
  @ApiProperty({ example: '991234567', description: "Admin's phone number" })
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  @ApiProperty({ example: '1234567', description: "Admin's password" })
  @IsString()
  @Length(5, 15, {
    message: "Parolning uzunligi 5 dan katta 15 dan kichik bo'lishi kerak",
  })
  hashed_password: string;
}
