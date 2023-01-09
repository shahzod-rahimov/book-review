import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  readonly comment: string;
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
  @IsOptional()
  @IsNumber()
  readonly user_id: number;
  @IsOptional()
  @IsNumber()
  readonly reply_comment_id: number;
}
