import jwt from 'jsonwebtoken';
import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { Client } from 'pg';

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

describe('Should change the password of the user', () => {
  test('should change the password', async () => {
    const user = await createUser('change-password-1@test.com');

    const token = generateToken(user.id!);

    const response = await request(app)
      .patch(`/users/${user.id}/updatePassword`)
      .set('Authorization', `bearer ${token}`)
      .send({
        oldPassword: 'password',
        newPassword: 'newPassword',
      });

    expect(response.statusCode).toBe(200);
  });

  test('should not change the password if too small', async () => {
    const user = await createUser('change-password-2@test.com');

    const token = generateToken(user.id!);

    const response = await request(app)
      .patch(`/users/${user.id}/updatePassword`)
      .set('Authorization', `bearer ${token}`)
      .send({
        oldPassword: 'password',
        newPassword: '123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.issues[0].code).toBe('too_small');
  });
});
