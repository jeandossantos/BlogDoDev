import { Client } from 'pg';
import request from 'supertest';
import { app } from '../../../src';
import { prisma } from '../../../src/connection/prisma';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let user;

beforeAll(async () => {
  await client.connect();
  await client.query('DELETE FROM users');
  await client.end();

  user = await prisma.user.create({
    data: {
      username: 'user to be updated',
      email: 'userToBeDeleted@example.com',
      password: 'password',
    },
  });
});

describe('should remove a user', () => {
  it('should remove the user', async () => {
    const response = await request(app).delete(`/users/${user.id}`);

    expect(response.status).toBe(200);
  });
});
