import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookPhotoDto {
  @IsOptional()
  @IsString()
  readonly photo_file_name: string;
  @IsOptional()
  @IsString()
  readonly photo_alt_string: string;
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
}
