import { Client } from 'pg';
import request from 'supertest';
import { app } from '../../../src';
import { prisma } from '../../../src/connection/prisma';

let user;

beforeAll(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query('DELETE FROM users');
  await client.end();

  user = await prisma.user.create({
    data: {
      username: 'user to be updated',
      email: 'user@example.com',
      password: 'password',
    },
  });
});

describe('update user', () => {
  it('should update user', async () => {
    console.log(user.id);
    const response = await request(app).put(`/users/${user.id}`).send({
      username: 'Updated user',
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(response.status).toBe(200);
    expect(updatedUser?.username).toBe('Updated user');
  });

  it('should not update user if username is too small', async () => {
    const response = await request(app).put(`/users/${user.id}`).send({
      username: '0',
    });

    expect(response.status).toBe(400);
  });
});
