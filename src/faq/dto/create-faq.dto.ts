import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({ example: 'poiuytrewq?', description: 'Question' })
  @IsString()
  readonly question: string;
  @ApiProperty({ example: 'qwertyuiop!', description: 'Answer' })
  @IsString()
  readonly answer: string;
}
