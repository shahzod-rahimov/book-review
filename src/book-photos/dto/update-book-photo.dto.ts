import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookPhotoDto {
  @ApiProperty({ example: 'image.jpg', description: "Book's image" })
  @IsOptional()
  @IsString()
  readonly photo_file_name: string;
  @ApiProperty({ example: 'image', description: "Book's image info" })
  @IsOptional()
  @IsString()
  readonly photo_alt_string: string;
  @ApiProperty({ example: '1', description: 'Book id' })
  @IsOptional()
  @IsNumber()
  readonly book_id: number;
}
