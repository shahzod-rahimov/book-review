import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
}
