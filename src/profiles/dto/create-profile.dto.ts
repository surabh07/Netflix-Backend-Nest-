import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_kid?: boolean;
}
