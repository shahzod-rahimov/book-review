import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ example: '1', description: 'Subscriber id' })
  @IsNumber()
  readonly subscriber_id: number;
  @ApiProperty({
    example: 'User/Publisher',
    description: 'Subscriber table name',
  })
  @IsString()
  readonly table_name: string;
}
