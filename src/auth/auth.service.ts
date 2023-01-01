import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { Model } from 'mongoose';

import { User } from 'src/user/schema/user.schema';
import { SignInDto, SignUpDto } from './dto';
import { UserSession } from './type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, name, password, passwordConfirmation } = signUpDto;

    // Is email exist ?
    const found = await this.userModel.exists({ email });

    if (found) throw new BadRequestException('Invalid email');
    //

    // Are passwords matches?
    if (password !== passwordConfirmation)
      throw new BadRequestException('Passwords do not match');
    //

    await this.userModel.create({
      email,
      name,
      password,
    });

    return { message: 'OK' };
  }

  async signIn(session: UserSession, signInDto: SignInDto) {
    const { email, password } = signInDto;

    // Is user exist ?
    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException('Incorrect email or password');
    //

    // Are passwords matches ?
    const matchesPassword = await compare(password, user.password);

    if (!matchesPassword)
      throw new UnauthorizedException('Incorrect email or password');
    //

    // Session starts
    this.signSession(session, user._id);
    //

    return { message: 'OK' };
  }

  async logOut(session: UserSession) {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);
        resolve(undefined);
      });
    });
  }

  // helpers
  signSession(session: UserSession, userId: string) {
    session.user = userId;
  }
}
