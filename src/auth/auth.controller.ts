import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Session as GetSession,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, GuestGuard } from 'src/common/guard';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { UserSession } from './type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseGuards(GuestGuard)
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GuestGuard)
  async signIn(
    @GetSession() session: UserSession,
    @Body() signInDto: SignInDto,
  ) {
    return await this.authService.signIn(session, signInDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async logOut(@GetSession() session: UserSession) {
    return await this.authService.logOut(session);
  }
}
