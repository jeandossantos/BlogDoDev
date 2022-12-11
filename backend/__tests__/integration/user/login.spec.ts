import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import { UserService } from './../../../src/app/user/UserService';
import { UserRepository } from './../../../src/app/user/UserRepository';
import { app } from '../../../src';

import { Client } from 'pg';

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

describe('Authenticate a user', () => {
  test('should authenticate a user', async () => {
    const user = await createUser('auth-user-1@test.com');

    const response = await request(app).post('/login').send({
      email: user.email,
      password: 'password',
    });

    expect(response.body).toHaveProperty('token');
  });

  test('should not authenticate if user not exists', async () => {
    const response = await request(app).post('/login').send({
      email: 'user-net-exists@test.com',
      password: 'password',
    });

    expect(response.body.message).toBe('User not found');
  });

  test('should not authenticate with wrong password', async () => {
    const user = await createUser('auth-user-3@test.com');

    const response = await request(app).post('/login').send({
      email: user.email,
      password: 'wrong password',
    });

    expect(response.body.message).toBe('Email or password incorrect');
  });
});
