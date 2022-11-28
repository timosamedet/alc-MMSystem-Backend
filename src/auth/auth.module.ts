import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { CoreSec } from 'src/utils/security';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [UsersModule, MailModule, ...CoreSec],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
