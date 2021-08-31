import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UserDto {
  // @IsNotEmpty()
  readonly UUID: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
  readonly nickname: string;

  @IsNotEmpty()
  readonly role: string;

  @MaxLength(64000)
  @IsNotEmpty()
  readonly image: string;
}
