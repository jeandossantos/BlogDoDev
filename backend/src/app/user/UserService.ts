import { z } from 'zod';
import jwt from 'jsonwebtoken';

import { IUser, IUserRepository } from './IUserRepository';
import { encryptPassword } from '../utils/utils';
import { CustomException } from '../../exceptions/CustomException';
import { compareSync } from 'bcrypt';

type createUserProps = Omit<IUser, 'id' | 'createdAt'> & {
  confirmPassword: string;
};

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async create(data: createUserProps) {
    if (data.password !== data.confirmPassword) {
      throw new CustomException('Passwords do not match');
    }

    const { username, email, password } = z
      .object({
        username: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
      })
      .parse(data);

    const userFromDB = await this.userRepository.findByEmail(email);

    if (userFromDB) throw new CustomException('User already exists');

    const user = await this.userRepository.create({
      username,
      email,
      password: encryptPassword(password),
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
      subject: user.id,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    };
  }

  async login(email: string, password: string) {
    if (!email || !password)
      throw new CustomException('Enter email and password');

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new CustomException('User not found');

    const isMatch = compareSync(password, user.password);

    if (!isMatch) throw new CustomException('Email or password incorrect');

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
      subject: user.id,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    };
  }

  async update(userId: string, username: string) {
    username = z.string().min(2).parse(username);

    await this.userRepository.update(userId, username);
  }

  async remove(id: string) {
    const user = await this.userRepository.remove(id);

    return user;
  }

  async changePassword(id: string, newPassword: string) {
    newPassword = z.string().min(6).parse(newPassword);

    const passwordHash = encryptPassword(newPassword);

    await this.userRepository.changePassword(id, passwordHash);
  }
}
