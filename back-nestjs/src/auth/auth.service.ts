import { compare } from 'bcrypt';
import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<{ email: string }> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      console.log(user);
      const isSame = await compare(pass, user.password);
      if (isSame) {
        return { email: user._id };
      }
      throw new HttpException('Wrong password', 403);
    }
    throw new HttpException('Wrong email', 403);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      token: this.jwtService.sign(payload, { expiresIn: '60s' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }
}
