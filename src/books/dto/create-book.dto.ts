import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly author: string;
  @IsString()
  readonly info: string;
  @IsNumber()
  readonly pages_number: number;
  @IsNumber()
  readonly price: number;
  @IsBoolean()
  readonly is_exists: boolean;
}
