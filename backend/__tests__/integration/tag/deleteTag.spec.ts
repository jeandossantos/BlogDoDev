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

  userId = (await createUser('user-test-delete-tag@test.com')).id!;
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

describe('Remove tag', () => {
  it('should remove a tag', async () => {
    const tag = await prisma.tag.create({ data: { name: 'tag to e deleted' } });

    const token = generateToken(userId);

    const response = await request(app)
      .delete('/tags/' + tag.id)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not remove tag with articles', async () => {
    const tag = await prisma.tag.create({
      data: { name: 'tag 123' },
    });

    await prisma.article.create({
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

    const token = generateToken(userId);

    const response = await request(app)
      .delete('/tags/' + tag.id)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'This tag has articles. It cannot be removed.'
    );
  });
});
