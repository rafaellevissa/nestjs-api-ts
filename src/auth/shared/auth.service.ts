import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return null;
    }

    const passwordTrue = await bcrypt.compare(userPassword, user.password);
    if (user && passwordTrue) {
      const { id, name, email } = user;
      return { id, name, email };
    }

    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async refresh(token: string) {
    try {
      const tokenDecode = (await this.jwtService.verifyAsync(
        token,
      )) as TokenProps;
      const payload = { email: tokenDecode.email, sub: tokenDecode.sub };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }
  }
}

interface TokenProps {
  email: string;
  sub: string;
  iat: number;
  exp: number;
}
