import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Fantastika', description: 'Category name' })
  @IsString()
  readonly name: string;
  @ApiProperty({ example: '1', description: 'Book id' })
  @IsNumber()
  readonly book_id: number;
}
