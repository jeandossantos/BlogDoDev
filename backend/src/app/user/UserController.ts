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

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const payload = await this.userService.login(email, password);

    return res.status(200).json(payload);
  }

  async update(req: Request, res: Response) {
    const { username } = req.body;

    const userId = req.params.userId;

    await this.userService.update(userId, username);

    return res.status(200).json();
  }
}
