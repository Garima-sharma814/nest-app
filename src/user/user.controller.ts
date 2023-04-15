import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { getUser } from 'src/auth/decorator';
import { JwtGaurd } from 'src/auth/gaurd';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGaurd) // gaurd is kind of a middleware
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@getUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@getUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
