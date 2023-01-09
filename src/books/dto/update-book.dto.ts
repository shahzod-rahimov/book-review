import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsString()
  readonly info: string;

  @IsOptional()
  @IsNumber()
  readonly pages_number: number;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsBoolean()
  readonly is_exists: boolean;
}
