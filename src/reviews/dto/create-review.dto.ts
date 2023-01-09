import { IsBoolean, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @Length(7)
  readonly title: string;
  @IsString()
  readonly text: string;
  @IsBoolean()
  readonly is_checked: boolean;
  @IsNumber()
  readonly book_id: number;
  @IsNumber()
  readonly user_id: number;
}
