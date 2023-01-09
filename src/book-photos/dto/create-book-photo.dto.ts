import { IsNumber, IsString } from 'class-validator';

export class CreateBookPhotoDto {
  @IsString()
  readonly photo_file_name: string;
  @IsString()
  readonly photo_alt_string: string;
  @IsNumber()
  readonly book_id: number;
}
