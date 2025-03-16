import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';
import { AuthGuard } from './auth.guard';
import { UserDecorator } from '../user/user.decorator';
import { User } from '../user/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ type: TokenDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async register(@Body() dto: RegisterDto): Promise<TokenDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOkResponse({ type: TokenDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async login(@Body() dto: LoginDto): Promise<TokenDto> {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOkResponse({ type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  profile(@UserDecorator() user: User): User {
    return user;
  }
}
