import jwt from 'jsonwebtoken';
import { describe, expect, it } from '@jest/globals';
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

  userId = (await createUser('user-test-finById-article@test.com')).id!;
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

describe('find an article', () => {
  it('should fetch an article', async () => {
    const tag = await prisma.tag.create({
      data: { name: 'some tag again' },
    });

    const article = await prisma.article.create({
      data: {
        authorId: userId,
        title: 'some article for test',
        description: 'some description',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        tags: {
          connect: [{ id: tag.id }],
        },
      },
    });

    const response = await request(app).get('/articles/' + article.id);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(article.title);
    expect(response.body.content).toBe(article.content);
    expect(response.body.description).toBe(article.description);
  });
});
