import { UserService } from '../../../app/user/UserService';
import { UserRepoInMemory } from '../../../inMemory/UserRepoInMemory';

const userService = new UserService(new UserRepoInMemory());

describe('create User', () => {
  it('should create a user', async () => {
    const user = await userService.create({
      username: 'txtdbr',
      email: 'txtdbr@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    });

    expect(user).toHaveProperty('token');
    expect(user).toHaveProperty('id');
  });
});
