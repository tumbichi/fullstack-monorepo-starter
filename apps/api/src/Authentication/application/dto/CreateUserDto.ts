import Role from '@api/Authentication/domain/models/Role';

export default interface CreateUserDto {
  name: string;
  email: string;
  role: Role;
  passwordHashed: string;
}
