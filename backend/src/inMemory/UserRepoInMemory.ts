import { IUser, IUserRepository } from '../app/user/IUserRepository';
import { randomUUID } from 'crypto';

const User: IUser[] = [];

export class UserRepoInMemory implements IUserRepository {
  async findByEmail(email: string) {
    const user = User.find((user) => user.email === email);

    return user || null;
  }

  async create(user: IUser): Promise<IUser> {
    user.id = randomUUID();

    User.push(user);

    return Promise.resolve(user);
  }
}
