import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 'qwerty', description: 'Review title' })
  @IsOptional()
  @IsString()
  @Length(7)
  readonly title: string;
  @ApiProperty({
    example: 'qwertyuiop asdfghjkl zxcvbnm',
    description: 'Review text',
  })
  @IsOptional()
  @IsString()
  readonly text: string;
  @ApiProperty({ example: 'true', description: 'Is review checked' })
  @IsOptional()
  @IsBoolean()
  readonly is_checked: boolean;
  @ApiProperty({ example: '1', description: 'Book id' })
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
  @ApiProperty({ example: '2', description: 'User id' })
  @IsOptional()
  @IsNumber()
  readonly user_id: number;
}
