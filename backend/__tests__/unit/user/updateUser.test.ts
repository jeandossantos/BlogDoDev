import { UserService } from '../../../src/app/user/UserService';
import { UserRepoInMemory } from '../../../src/inMemory/UserRepoInMemory';

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

  it('should not update a user with username less than 2 characters', async () => {
    const user = await userService.create({
      username: 'teste2UpdateUser',
      email: 'testeUpdate2User@teste.com',
      password: 'testeUpdateUserPassword',
      confirmPassword: 'testeUpdateUserPassword',
    });

    const result = userService.update(user.id!, 'A');

    expect(result).rejects.toThrow();
  });
});
