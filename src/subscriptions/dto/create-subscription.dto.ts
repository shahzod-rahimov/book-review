import { IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  readonly subscriber_id: number;
}
