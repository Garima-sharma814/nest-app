import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGaurd } from 'src/auth/gaurd';

@Controller('users')
export class UserController {
  @UseGuards(JwtGaurd)
  @Get('me')
  getMe(@Req() req: any) {
    console.log(req.user);
    return req.user;
  }
}
