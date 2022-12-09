import { UserRepository } from './../app/user/UserRepository';
import { UserController } from '../app/user/UserController';
import { UserService } from '../app/user/UserService';

import { Router } from 'express';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const routes = Router();

routes.post('/register', (req, res) => {
  return userController.store(req, res);
});

routes.post('/login', (req, res) => {});
routes.put('/users/:userId', (req, res) => {});
routes.delete('/users/:userId', (req, res) => {});

routes.patch('/users/:userId/updatePassword', (req, res) => {});

export { routes };