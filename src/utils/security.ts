import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

export { jwtConstants };

const jwtConstants = {
  secret: 'secretKey',
};

export const CoreSec = [
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60d' },
  }),
];
