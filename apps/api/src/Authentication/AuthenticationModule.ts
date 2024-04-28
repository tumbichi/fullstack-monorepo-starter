import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import AuthenticationService from './application/service/AuthenticationService';
import UserRepository from './domain/port/UserPort';
import UserService from './application/service/UserService';

import AuthenticationController from './infrastructure/controllers/AuthenticationController';
import UserAdapter from './infrastructure/adapters/UserAdapter';

import JwtStrategy from './infrastructure/strategy/JwtStrategy';
import LocalStrategy from './infrastructure/strategy/LocalStrategy';
import UserController from './infrastructure/controllers/UserController';

const jwtFactory = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP_D'),
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [JwtModule.registerAsync(jwtFactory), PassportModule],
  controllers: [AuthenticationController, UserController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    UserService,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: UserAdapter,
    },
  ],
  exports: [AuthenticationService, JwtModule, JwtStrategy, PassportModule],
})
export class AuthenticationModule {}
