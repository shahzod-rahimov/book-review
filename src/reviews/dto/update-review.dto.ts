import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @Length(7)
  readonly title: string;
  @IsOptional()
  @IsString()
  readonly text: string;
  @IsOptional()
  @IsBoolean()
  readonly is_checked: boolean;
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
  @IsOptional()
  @IsNumber()
  readonly user_id: number;
}
