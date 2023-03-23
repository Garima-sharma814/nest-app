import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  // using dtos (data transfer objects) for validations
  signup(@Body() dto: AuthDTO) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDTO) {
    return this.authService.signIn(dto);
  }
}
