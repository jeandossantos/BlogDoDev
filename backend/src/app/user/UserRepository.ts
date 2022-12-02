import { IUser, IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  async create(user: IUser): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
