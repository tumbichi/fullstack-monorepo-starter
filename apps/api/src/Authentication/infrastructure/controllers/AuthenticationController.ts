import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { ZodValidationPipe } from 'nestjs-zod';

import User from '../../domain/models/User';

import LoginResponseDto from '../../application/dto/LoginResponseDto';
import SignUpDto from '../../application/dto/SignUpDto';
import SignUpSchema from '../../application/schema/SignUpSchema';
import AuthenticationService from '../../application/service/AuthenticationService';

import { LocalAuthGuard } from '../guards/LocalAuthGuard';
import JwtAuthGuard from '../guards/JwtAuthGuard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export default class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Req() request: Request & { user: User },
  ): Promise<LoginResponseDto> {
    return this.authenticationService
      .login(request.user)
      .then((loginResponse) => loginResponse)
      .catch((error) => {
        switch (error.name) {
          case 'WrongPasswordException': {
            throw new HttpException('Contraseña incorrecta', 404);
          }
          case 'UserDoesntExistsException': {
            throw new HttpException('El usuario no existe', 404);
          }
          default: {
            const errorMessage =
              typeof error.message === 'string' ? error.message : undefined;
            throw new UnauthorizedException(error, errorMessage);
          }
        }
      });
  }

  @UsePipes(new ZodValidationPipe(SignUpSchema))
  @Post('/sign-up')
  async signUpUser(@Body() singUpUserDto: SignUpDto): Promise<User> {
    return this.authenticationService
      .signUp(singUpUserDto)
      .then((user) => user)
      .catch((error) => {
        switch (error.name) {
          case 'InvalidEmailException': {
            throw new HttpException('Email invalido', 404);
          }
          case 'InvalidPasswordException': {
            throw new HttpException('Password invalido', 404);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create-admin')
  async createAdminUser(@Body() createUserDto: SignUpDto): Promise<User> {
    return this.authenticationService
      .signUpAdmin(createUserDto)
      .then((user) => user)
      .catch((error) => {
        switch (error.name) {
          case 'InvalidEmailException': {
            throw new HttpException(error.message, 400);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/validate-authorization')
  async validateAuthorization(
    @Req() request: Request & { user: User },
  ): Promise<User> {
    return request.user;
  }
}
