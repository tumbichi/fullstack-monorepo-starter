import User from '@api/Authentication/domain/models/User';

export default interface LoginResponseDto {
  user: Omit<User, 'password'>;
  accessToken: string;
}
