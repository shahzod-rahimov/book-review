import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 'qwerty', description: 'Review title' })
  @IsString()
  @Length(7)
  readonly title: string;
  @ApiProperty({
    example: 'qwertyuiop asdfghjkl zxcvbnm',
    description: 'Review text',
  })
  @IsString()
  readonly text: string;
  @ApiProperty({ example: 'true', description: 'Is review checked' })
  @IsBoolean()
  readonly is_checked: boolean;
  @ApiProperty({ example: '1', description: 'Book id' })
  @IsNumber()
  readonly book_id: number;
  @ApiProperty({ example: '2', description: 'User id' })
  @IsNumber()
  readonly user_id: number;
}
