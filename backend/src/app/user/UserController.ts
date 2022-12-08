import { Request, Response } from 'express';
import { UserService } from './UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async store(req: Request, res: Response) {
    const { username, email, password, confirmPassword } = req.body;

    const user = await this.userService.create({
      username,
      email,
      password,
      confirmPassword,
    });

    return res.status(201).json(user);
  }
}
