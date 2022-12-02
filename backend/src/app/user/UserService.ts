import { z } from 'zod';
import jwt from 'jsonwebtoken';

import { IUser, IUserRepository } from './IUserRepository';
import { encryptPassword } from '../utils/utils';
import { CustomException } from '../../exceptions/CustomException';

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

    const user = await this.userRepository.create({
      username,
      email,
      password: encryptPassword(password),
    });

    const token = jwt.sign({ id: user.id }, 'secret', {
      subject: user.id,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    };
  }
}
