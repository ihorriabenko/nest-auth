import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @MinLength(8)
  @MaxLength(254)
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(128)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u, {
    message:
      'Password must contain one uppercase letter, one lowercase letter, and one digit',
  })
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  passwordConfirmation: string;
}
