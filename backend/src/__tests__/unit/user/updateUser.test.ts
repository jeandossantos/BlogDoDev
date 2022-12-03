import { UserService } from '../../../app/user/UserService';
import { UserRepoInMemory } from '../../../inMemory/UserRepoInMemory';

const userService = new UserService(new UserRepoInMemory());

describe('Update a User', () => {
  it('should update a user', async () => {
    const user = await userService.create({
      username: 'testeUpdateUser',
      email: 'testeUpdateUser@teste.com',
      password: 'testeUpdateUserPassword',
      confirmPassword: 'testeUpdateUserPassword',
    });

    const result = await userService.update(user.id!, 'updated User');

    expect(result).toBe(undefined);
  });
});
