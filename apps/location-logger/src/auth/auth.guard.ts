import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from './dto/jwt.dto';
import { User } from '../user/user.entity';
import UserService from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private JwtService: JwtService,
    private UserService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeaders(request);

    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }

    try {
      const payload: CreateTokenDto =
        this.JwtService.verify<CreateTokenDto>(token);

      const user: User | null = await this.UserService.findOne(payload.email);
      if (!user) {
        throw new UnauthorizedException(
          'Authorization informations are incorrect',
        );
      }
      request['user'] = user;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeaders(request: Request): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    if (!token && type !== 'Bearer') {
      throw new UnauthorizedException(
        'Invalid or missing authorization token.',
      );
    }
    return token;
  }
}
