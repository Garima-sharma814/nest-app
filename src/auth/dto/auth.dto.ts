import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/* dtos (data transfer objects) for validations
data first passes through dtos stated in the request (check controller)
we need to instantiate Validation Pipes to use it globally check the main.ts file */
