import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateSubscriptionDto {
  @ApiProperty({ example: '1', description: 'Subscriber id' })
  @IsNumber()
  readonly subscriber_id: number;
}
