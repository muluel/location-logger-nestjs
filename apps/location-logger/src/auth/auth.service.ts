import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import UserService from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { TokenDto } from './dto/token.dto';
import { CreateTokenDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private JwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<TokenDto> {
    dto.password = await argon2.hash(dto.password);
    const user = await this.UserService.create(dto);
    return await this.createToken({ sub: user.id, email: user.email });
  }

  async login(dto: LoginDto): Promise<TokenDto> {
    const user = await this.UserService.findOne(dto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await argon2.verify(user.password, dto.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return await this.createToken({ sub: user.id, email: user.email });
  }

  async createToken(user: CreateTokenDto): Promise<TokenDto> {
    return {
      access_token: await this.JwtService.signAsync({
        sub: user.sub,
        email: user.email,
      }),
    };
  }
}
