import { describe, expect, test } from '@jest/globals';
import { Client } from 'pg';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { UserService } from './../../../src/app/user/UserService';
import { UserRepository } from './../../../src/app/user/UserRepository';
import { app } from '../../../src';
import { prisma } from '../../../src/connection/prisma';
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

describe('update user', () => {
  test('should update user', async () => {
    const user = await createUser('update-user-1@test.com');

    const token = generateToken(user.id!);

    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        username: 'Updated user',
      })
      .set('Authorization', `Bearer ${token}`);

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(response.status).toBe(200);
    expect(updatedUser?.username).toBe('Updated user');
  });

  test('should not update user if username is too small', async () => {
    const user = await createUser('update-user-2@test.com');
    const token = generateToken(user.id!);

    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        username: '0',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
