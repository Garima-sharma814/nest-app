import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signUp(dto: AuthDTO) {
    console.log(dto);
    // generate password hash
    // save user in db
    // return user data
    return 'I am signed in';
  }

  signIn() {
    return 'I am signin in';
  }
}
