import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly comment: string;
  @IsNumber()
  readonly book_id: number;
  @IsNumber()
  readonly user_id: number;
  @IsNumber()
  @IsOptional()
  readonly reply_comment_id: number;
}
