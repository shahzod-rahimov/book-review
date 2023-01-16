import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Molxona', description: 'Book name' })
  @IsString()
  readonly name: string;
  @ApiProperty({ example: 'Jorj Oruell', description: 'Book author name' })
  @IsString()
  readonly author: string;
  @ApiProperty({
    example: 'qwertyuiop asdfghjkl zxcvbnm',
    description: 'Info about book',
  })
  @IsString()
  readonly info: string;
  @ApiProperty({ example: '100', description: 'Book pages_number' })
  @IsNumber()
  readonly pages_number: number;
  @ApiProperty({ example: '15.000', description: 'Book price' })
  @IsNumber()
  readonly price: number;
  @ApiProperty({ example: 'true', description: 'Is book exists' })
  @IsBoolean()
  readonly is_exists: boolean;
}
