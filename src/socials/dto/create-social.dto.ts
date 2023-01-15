import { IsString } from "class-validator";

export class CreateSocialDto {
  // @IsString()
  // readonly social_icon_file_name: string;
  @IsString()
  readonly social_name: string;
  @IsString()
  readonly social_link: string;
}
