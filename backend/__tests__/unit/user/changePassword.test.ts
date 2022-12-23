import { ZodError } from 'zod';
import { UserService } from '../../../src/app/user/UserService';
import { UserRepoInMemory } from '../../../src/inMemory/UserRepoInMemory';

const userService = new UserService(new UserRepoInMemory());
let user: { id: any; username?: string; email?: string; token?: string };

beforeAll(async () => {
  user = await userService.create({
    username: 'changePassword',
    email: 'changePasswordTest@teste.com',
    password: 'changePasswordTest',
    confirmPassword: 'changePasswordTest',
  });
});

describe('Change user password', () => {
  it('should change user password successfully', async () => {
    const result = await userService.changePassword(
      user.id,
      'changePasswordTest',
      'userPasswordChanged'
    );

    expect(result).toBe(undefined);
  });

  it('should not change user password if the password is less then 6 characters', async () => {
    const result = userService.changePassword(
      user.id,
      'changePasswordTest',
      '12345'
    );

    await expect(result).rejects.toThrow(ZodError);
  });
});
