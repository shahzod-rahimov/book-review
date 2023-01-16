import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSocialDto {
  @ApiProperty({ example: 'Telegram', description: 'Telegram' })
  @IsOptional()
  @IsString()
  readonly social_name: string;
  @ApiProperty({
    example: 'https://t.me',
    description: 'Telegram account link',
  })
  @IsOptional()
  @IsString()
  readonly social_link: string;
}
