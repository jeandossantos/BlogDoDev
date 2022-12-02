import { UserService } from '../../../app/user/UserService';
import { UserRepoInMemory } from '../../../inMemory/UserRepoInMemory';

const userService: UserService = new UserService(new UserRepoInMemory());

describe('Remove a user', () => {
  it('should remove a user', async () => {
    const newUser = await userService.create({
      username: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      confirmPassword: '123456',
    });

    const result = await userService.remove(newUser.id!);

    expect(result).toBe(newUser.id);
  });
});
