import { UserService } from '../../../src/app/user/UserService';
import { UserRepoInMemory } from '../../../src/inMemory/UserRepoInMemory';

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

  it('should throw a error if user not exists', async () => {
    const result = userService.remove('123');

    expect(result).rejects.toThrowError(new Error('User not found'));
  });
});
