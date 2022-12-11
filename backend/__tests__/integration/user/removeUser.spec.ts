import jwt from 'jsonwebtoken';
import { describe, expect, test } from '@jest/globals';
import { Client } from 'pg';
import request from 'supertest';

import { UserService } from './../../../src/app/user/UserService';
import { UserRepository } from './../../../src/app/user/UserRepository';
import { app } from '../../../src';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();
});

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

const generateToken = function (id: string) {
  return jwt.sign({ id: id }, process.env.SECRET_KEY!);
};

describe('should remove a user', () => {
  test('should remove the user', async () => {
    const user = await createUser('user-to-be-deleted@test.com');

    const token = generateToken(user.id!);

    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
