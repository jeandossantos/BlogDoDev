import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();
});

import { UserService } from './../../../src/app/user/UserService';
import { UserRepository } from './../../../src/app/user/UserRepository';
import { app } from '../../../src';

async function createUser(email: string) {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);

  return userService.create({
    username: 'my user test',
    email,
    password: 'password',
    confirmPassword: 'password',
  });
}

describe('Should change the password of the user', () => {
  test('should change the password', async () => {
    const user = await createUser('change-password-1@test.com');

    const response = await request(app)
      .patch(`/users/${user.id}/updatePassword`)
      .send({
        newPassword: 'newPassword',
      });

    expect(response.statusCode).toBe(200);
  });

  test('should not change the password if too small', async () => {
    const user = await createUser('change-password-2@test.com');

    const response = await request(app)
      .patch(`/users/${user.id}/updatePassword`)
      .send({
        newPassword: '123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.issues[0].code).toBe('too_small');
  });
});
