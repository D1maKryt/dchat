import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Strategies } from './strategies';
import { Profile } from 'passport-google-oauth20';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly strategies: Strategies) {
    super({
      clientID: process.env.clientID!,
      clientSecret: process.env.clientSecret!,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id } = profile;
    let name: string;

    if (profile.name) {
      name = profile.name.givenName + ' ' + profile.name.familyName;
    } else {
      name = profile.displayName;
    }

    let email: string;

    if (profile.emails) {
      email = profile.emails[0]?.value || '';
    } else {
      email = '';
    }

    let picture: string;
    if (profile.photos) {
      picture = profile.photos[0]?.value || '';
    } else {
      picture = '';
    }

    const user = {
      provider: 'google',
      providerId: id,
      username: name,
      email: email,
      picture: picture,
      accessToken,
      refreshToken,
    };

    const SingIn = await this.strategies.singInServes(user);
    if (SingIn) return done(false, SingIn);
    const SingUp = await this.strategies.singUpServes(user);
    if (SingUp) return done(false, SingUp);
  }
}
