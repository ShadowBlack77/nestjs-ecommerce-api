import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTokens, LoginSession, User } from 'src/entities';
import { UserService } from 'src/user/user.service';
import { GoogleStrategy, JwtStrategy, LocalStrategy, RefreshJwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard, JwtAuthGuard } from './guards';
import { RolesGuard } from './guards/roles/roles.guard';
import googleOauthConfig from './config/google-oauth.config';
import { MailsService } from 'src/mails/mails.service';
import { LoginSessionService } from 'src/login-session/login-session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, EmailTokens, LoginSession]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleOauthConfig)
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
    MailsService,
    LoginSessionService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AuthModule {}
