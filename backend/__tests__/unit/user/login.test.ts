import { IUser } from './../../../src/app/user/IUserRepository';
import { UserService } from '../../../src/app/user/UserService';
import { CustomException } from '../../../src/exceptions/CustomException';
import { UserRepoInMemory } from '../../../src/inMemory/UserRepoInMemory';

const userService = new UserService(new UserRepoInMemory());

beforeAll(async () => {
  await userService.create({
    username: 'valid username',
    email: 'test-login@gmail.com',
    password: '123456',
    confirmPassword: '123456',
  });
});

describe('create User', () => {
  it('should authenticate a user', async () => {
    const payload = await userService.login('test-login@gmail.com', '123456');

    expect(payload).toHaveProperty('token');

    expect(payload).toHaveProperty('id');
    expect(payload).toHaveProperty('username');
    expect(payload).toHaveProperty('email');
  });

  it('should not authenticate a user if user not exists', async () => {
    const result = userService.login('user@notExists.com', '123456');

    await expect(result).rejects.toThrowError(
      new CustomException('User not found')
    );
  });

  it('should not authenticate a user with wrong password', async () => {
    const result = userService.login('test-login@gmail.com', '1234567890');

    await expect(result).rejects.toThrowError(
      new CustomException('Email or password incorrect')
    );
  });

  it('should not authenticate a user with no email', async () => {
    const result = userService.login('', '1234567890');

    await expect(result).rejects.toThrowError(
      new CustomException('Enter email and password')
    );
  });

  it('should not authenticate a user with no password', async () => {
    const result = userService.login('test-login@gmail.com', '');

    await expect(result).rejects.toThrowError(
      new CustomException('Enter email and password')
    );
  });
});
