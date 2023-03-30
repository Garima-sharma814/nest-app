import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { getUser } from 'src/auth/decorator';
import { JwtGaurd } from 'src/auth/gaurd';

@UseGuards(JwtGaurd) // gaurd is kind of a middleware
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@getUser() user: User) {
    return user;
  }
}
