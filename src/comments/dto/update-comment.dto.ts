import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ example: 'some comment', description: 'Comment text' })
  @IsOptional()
  @IsString()
  readonly comment: string;
  @ApiProperty({ example: '1', description: 'Book id' })
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
  @ApiProperty({ example: '2', description: 'User id' })
  @IsOptional()
  @IsNumber()
  readonly user_id: number;
  @ApiProperty({ example: '3', description: 'Comment id' })
  @IsOptional()
  @IsNumber()
  readonly reply_comment_id: number;
}
