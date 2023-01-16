import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookPhotoDto {
  @ApiProperty({ example: 'image.jpg', description: "Book's image" })
  @IsString()
  readonly photo_file_name: string;
  @ApiProperty({ example: 'image', description: "Book's image info" })
  @IsString()
  readonly photo_alt_string: string;
  @ApiProperty({ example: '1', description: 'Book id' })
  @IsNumber()
  readonly book_id: number;
} 
