import { IsOptional, IsString } from 'class-validator';

export class UpdateSocialDto {
  @IsOptional()
  @IsString()
  readonly social_icon_file_name: string;
  @IsOptional()
  @IsString()
  readonly social_name: string;
  @IsOptional()
  @IsString()
  readonly social_link: string;
}
