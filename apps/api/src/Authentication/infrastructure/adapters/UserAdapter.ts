import { Injectable } from '@nestjs/common';

import PrismaClient from '@api/Base/infraestructure/libs/prisma/PrismaClient';

import User from '@api/Authentication/domain/models/User';
import UserPort from '@api/Authentication/domain/port/UserPort';

import UserEntity from '../entity/UserEntity';

@Injectable()
export default class UserAdapter implements UserPort {
  client: PrismaClient['user'];

  constructor(prisma: PrismaClient) {
    this.client = prisma.user;
  }

  async insert(user: User): Promise<User> {
    const userEntity = await this.client.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });

    return this.mapEntityToDomain(userEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.client.findUniqueOrThrow({ where: { id } });

    return this.mapEntityToDomain(userEntity);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userEntity = await this.client.findUnique({
      where: { email },
    });
    return userEntity ? this.mapEntityToDomain(userEntity) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.client.findMany();

    return users.map((userEntity) => this.mapEntityToDomain(userEntity));
  }

  async delete(id: string): Promise<User> {
    const userEntity = await this.client.delete({ where: { id } });

    return this.mapEntityToDomain(userEntity);
  }

  async update(id: string, partialUser: Partial<User>): Promise<User> {
    const userEntity = await this.client.update({
      data: {
        name: partialUser.name,
        email: partialUser.email,
        role: partialUser.role,
      },
      where: {
        id,
      },
    });

    return this.mapEntityToDomain(userEntity);
  }

  private mapEntityToDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.name,
      userEntity.email,
      userEntity.role,
      userEntity.password,
      userEntity.id,
    );
  }
}
