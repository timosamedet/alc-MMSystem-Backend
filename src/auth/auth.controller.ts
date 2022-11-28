import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { UpdatePasswordDto } from 'src/users/dto/update-password';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async getCurrentUser(@GetUser() user: User): Promise<User> {
    return await this.authService.getUser(+user.id);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) signinCredentialsDto: SignInCredentialsDto,
  ) {
    return await this.authService.login(signinCredentialsDto);
  }

  @Post('register')
  async register(
    @Body(ValidationPipe) signUpCredentialsDto: SignupCredentialsDto,
  ) {
    return await this.authService.register(signUpCredentialsDto);
  }

  @Get('email/forgot-password/:email')
  async forgotPassword(@Param() params) {
    return await this.authService.forgotPassword(params.email);
  }

  @Post('email/reset-password')
  @HttpCode(HttpStatus.OK)
  async setNewPassword(
    @Body() resetPassword: UpdatePasswordDto,
  ): Promise<User> {
    return await this.authService.changePassword(resetPassword);
  }

  @Put('verify')
  async verifyEmail(
    @Query('email') email: string,
    @Query('token') token: string,
  ) {
    return await this.authService.verifyEmail(email, token);
  }
}
