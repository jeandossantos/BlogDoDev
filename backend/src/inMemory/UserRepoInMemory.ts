import { IUser, IUserRepository } from '../app/user/IUserRepository';
import { randomUUID } from 'crypto';

const User: IUser[] = [];

export class UserRepoInMemory implements IUserRepository {
  async update(userId: string, username: string): Promise<void> {
    User.map((user, index) => {
      if (user.id === userId) {
        User[index].username = username;
      }
    });
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    User.map((user, index) => {
      if (user.id === userId) {
        User[index].password = newPassword;
      }
    });
  }

  async remove(id: string): Promise<string> {
    const user = User.find((user) => user.id === id);

    if (!user) throw new Error('User not found');

    return user.id || '';
  }

  async findByEmail(email: string) {
    const user = User.find((user) => user.email === email);

    return user || null;
  }

  async findById(id: string) {
    const user = User.find((user) => user.id === id);

    return user || null;
  }

  async create(user: IUser): Promise<IUser> {
    user.id = randomUUID();

    User.push(user);

    return Promise.resolve(user);
  }
}
