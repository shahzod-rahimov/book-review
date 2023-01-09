import { IsString } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  readonly question: string;

  @IsString()
  readonly answer: string;
}
