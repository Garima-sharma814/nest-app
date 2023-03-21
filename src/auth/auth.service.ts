import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp() {
    return 'I am signed in';
  }

  signIn() {
    return 'I am signin in';
  }
}
