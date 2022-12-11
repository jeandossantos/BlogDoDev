import jwt from 'jsonwebtoken';
import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { Client } from 'pg';

import { UserRepository } from './../../../src/app/user/UserRepository';
import { UserService } from './../../../src/app/user/UserService';
import { app } from '../../../src';
import { prisma } from '../../../src/connection/prisma';

let userId: string;

beforeAll(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query('delete from tags');
  await client.query('delete from users');
  await client.end();

  userId = (await createUser('user-test-tag@test.com')).id!;
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

describe('create tag', () => {
  it('should create a tag', async () => {
    const token = generateToken(userId);

    const response = await request(app)
      .post('/tags')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'some tag' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toStrictEqual('some tag');
  });

  it('should not create a tag with invalid tag name', async () => {
    const token = generateToken(userId);

    const response = await request(app)
      .post('/tags')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 's' });

    expect(response.status).toBe(400);

    expect(response.body.issues[0].code).toBe('too_small');
  });
});
