import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'some comment', description: 'Comment text' })
  @IsString()
  readonly comment: string;
  @ApiProperty({ example: '1', description: 'Book id' })
  @IsNumber()
  readonly book_id: number;
  @ApiProperty({ example: '2', description: 'User id' })
  @IsNumber()
  readonly user_id: number;
  @ApiProperty({ example: '3', description: 'Comment id' })
  @IsNumber()
  @IsOptional()
  readonly reply_comment_id: number;
}
