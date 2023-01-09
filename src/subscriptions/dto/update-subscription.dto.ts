import { IsNumber } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsNumber()
  readonly subscriber_id: number;
}
