import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ example: 'Molxona', description: 'Book name' })
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiProperty({ example: 'Jorj Oruell', description: 'Book author name' })
  @IsOptional()
  @IsString()
  readonly author: string;
  @ApiProperty({
    example: 'qwertyuiop asdfghjkl zxcvbnm',
    description: 'Info about book',
  })
  @IsOptional()
  @IsString()
  readonly info: string;
  @ApiProperty({ example: '100', description: 'Book pages_number' })
  @IsOptional()
  @IsNumber()
  readonly pages_number: number;
  @ApiProperty({ example: '15.000', description: 'Book price' })
  @IsOptional()
  @IsNumber()
  readonly price: number;
  @ApiProperty({ example: 'true', description: 'Is book exists' })
  @IsOptional()
  @IsBoolean()
  readonly is_exists: boolean;
}
