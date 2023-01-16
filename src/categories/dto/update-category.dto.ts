import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Fantastika', description: 'Category name' })
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiProperty({ example: '1', description: 'Book id' })
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
}
