import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly book_id: number;
}
