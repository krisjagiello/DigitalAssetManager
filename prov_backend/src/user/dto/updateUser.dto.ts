import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty() // Apparenty we're not required to do validation here, but I will leave these
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly bio: string;

  @IsNotEmpty()
  readonly image: string;
}
