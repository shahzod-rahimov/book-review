import { IsOptional, IsString } from 'class-validator';

export class UpdateFaqDto {
  @IsOptional()
  @IsString()
  readonly question: string;

  @IsOptional()
  @IsString()
  readonly answer: string;
}
