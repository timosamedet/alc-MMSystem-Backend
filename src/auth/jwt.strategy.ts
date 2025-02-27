import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log('payload', payload);
    const { id } = payload;
    const user = await this.userService.findOne({ id });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
