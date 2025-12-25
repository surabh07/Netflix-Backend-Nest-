import { User } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export enum UserRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  phonenumber: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserRoleEnum, { each: true })
  roles: UserRoleEnum[];
}
