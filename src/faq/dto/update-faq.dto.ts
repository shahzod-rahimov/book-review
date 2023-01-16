import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFaqDto {
  @ApiProperty({ example: 'poiuytrewq?', description: 'Question' })
  @IsOptional()
  @IsString()
  readonly question: string;
  @ApiProperty({ example: 'qwertyuiop!', description: 'Answer' })
  @IsOptional()
  @IsString()
  readonly answer: string;
}
