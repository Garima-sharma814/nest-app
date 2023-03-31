import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  //* using dtos (data transfer objects) for validations
  signup(@Body() dto: AuthDTO) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK) //* post request by default send 201 and get request send 200
  @Post('signin')
  signin(@Body() dto: AuthDTO) {
    return this.authService.signIn(dto);
  }
}
