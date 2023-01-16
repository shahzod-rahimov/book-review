import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSocialDto {
  @ApiProperty({ example: 'Telegram', description: 'Telegram' })
  @IsString()
  readonly social_name: string;
  @ApiProperty({
    example: 'https://t.me',
    description: 'Telegram account link',
  })
  @IsString()
  readonly social_link: string;
}
