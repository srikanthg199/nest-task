import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    protected readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      ignoreExpiration: false,
    });
  }
  async validate(payload: any) {
    const { password, ...user } = await this.userService.findUserById(
      payload.userId,
    );
    console.log(/p/, payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    const userToken = await this.authService.getUserTokenById(
      payload.encryptedUUID,
    );
    if (!userToken) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
