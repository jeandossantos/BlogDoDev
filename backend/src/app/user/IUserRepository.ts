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
  findById(id: string): Promise<IUser | null>;
  remove(id: string): Promise<string>;
  update(userId: string, username: string): Promise<void>;
  changePassword(userId: string, newPassword: string): Promise<void>;
}
