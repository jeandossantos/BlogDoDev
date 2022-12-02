export interface IUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
