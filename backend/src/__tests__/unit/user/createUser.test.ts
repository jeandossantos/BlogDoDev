import { ZodError } from 'zod';
import { UserService } from '../../../app/user/UserService';
import { CustomException } from '../../../exceptions/CustomException';
import { UserRepoInMemory } from '../../../inMemory/UserRepoInMemory';

const userService = new UserService(new UserRepoInMemory());

describe('create User', () => {
  it('should create a user', async () => {
    const result = await userService.create({
      username: 'txtdbr',
      email: 'txtdbr@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('id');
  });

  it('should not create a user if email already exists', async () => {
    const result = userService.create({
      username: 'txtdbr',
      email: 'txtdbr@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    });

    await expect(result).rejects.toThrowError(
      new CustomException('User already exists')
    );
  });

  it('should not create a user without a valid email', async () => {
    const result = userService.create({
      username: 'txtdbr',
      email: '',
      password: '123456',
      confirmPassword: '123456',
    });

    expect(result).rejects.toThrow();
  });

  it('should not create a user with a password lessen than 6 characters.', async () => {
    const result = userService.create({
      username: 'txtdbr',
      email: 'test@test.com',
      password: '12345',
      confirmPassword: '123456',
    });

    expect(result).rejects.toThrow();
  });

  it('should not create a user if confirmPassword is unlike of password.', async () => {
    const result = userService.create({
      username: 'txtdbr',
      email: 'test@test.com',
      password: '12345',
      confirmPassword: '12345',
    });

    expect(result).rejects.toThrow();
  });
});
