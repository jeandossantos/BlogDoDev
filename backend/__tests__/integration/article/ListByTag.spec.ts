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

  userId = (await createUser('user-test-list-by-tag-article@test.com')).id!;
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

describe('List articles', () => {
  it('should list articles by tag id', async () => {
    const tag = await prisma.tag.create({
      data: { name: 'someTag-test-1' },
    });

    const articles = await prisma.article.create({
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
    const response = await request(app).get(
      `/tags/${tag.id}/articles?page=2&search=my article`
    );

    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('articles');
    expect(response.body).toHaveProperty('limit');
  });
});
