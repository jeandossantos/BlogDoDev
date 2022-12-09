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
      email: 'changePassword@example.com',
      password: 'password',
    },
  });
});

describe('Should change the password of the user', () => {
  it('should change the password', async () => {
    const response = await request(app)
      .patch(`/users/${user.id}/updatePassword`)
      .send({
        newPassword: 'newPassword',
      });

    expect(response.statusCode).toBe(200);
  });

  it('should not change the password if too small', async () => {
    const response = await request(app)
      .patch(`/users/${user.id}/updatePassword`)
      .send({
        newPassword: '123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.issues[0].code).toBe('too_small');
  });
});
