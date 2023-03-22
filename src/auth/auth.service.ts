import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signUp() {
    return 'I am signed in';
  }

  signIn() {
    return 'I am signin in';
  }
}
