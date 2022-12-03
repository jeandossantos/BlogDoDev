import { UserService } from '../../../app/user/UserService';
import { UserRepoInMemory } from '../../../inMemory/UserRepoInMemory';

const userService = new UserService(new UserRepoInMemory());
let user;

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
      'userPasswordChanged'
    );

    expect(result).toBe(undefined);
  });
});
