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
  await client.query('delete from articles');
  await client.end();

  userId = (await createUser('user-test-create-article@test.com')).id!;
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

describe('Create article', () => {
  it('should create article', async () => {
    const tag = await prisma.tag.create({
      data: { name: 'someTag-test-1' },
    });

    const token = generateToken(userId);

    const response = await request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        authorId: userId,
        title: 'some article for test',
        description: 'some description',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        tags: [tag.id],
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not create article with invalid title', async () => {
    const tag = await prisma.tag.create({
      data: { name: 'someTag-test-2' },
    });

    const token = generateToken(userId);

    const response = await request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        authorId: userId,
        title: '',
        description: 'some description',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        tags: [tag.id],
      });

    expect(response.body.issues[0].code).toBe('too_small');
  });

  it('should not create article with invalid content', async () => {
    const tag = await prisma.tag.create({
      data: { name: 'someTag-test-3' },
    });

    const token = generateToken(userId);

    const response = await request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        authorId: userId,
        title: 'my title',
        description: 'some description',
        content: 'invalid content',
        tags: [tag.id],
      });

    expect(response.body.issues[0].code).toBe('too_small');
  });
});
