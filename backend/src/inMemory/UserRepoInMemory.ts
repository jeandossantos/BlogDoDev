import { IUser, IUserRepository } from '../app/user/IUserRepository';
import { randomUUID } from 'crypto';

const User: IUser[] = [];

export class UserRepoInMemory implements IUserRepository {
  async create(user: IUser): Promise<IUser> {
    user.id = randomUUID();

    User.push(user);

    return Promise.resolve(user);
  }
}
