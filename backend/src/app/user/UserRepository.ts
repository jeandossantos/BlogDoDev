import { prisma } from './../../connection/prisma';
import { IUser, IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  async create({ username, email, password }: IUser): Promise<IUser> {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return user;
  }

  async remove(id: string): Promise<string> {
    const user = await prisma.user.delete({
      where: { id },
    });

    return user.id;
  }

  async update(userId: string, username: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
