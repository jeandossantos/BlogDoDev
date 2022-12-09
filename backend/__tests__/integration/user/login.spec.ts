import { Client } from 'pg';
import request from 'supertest';
import { app } from '../../../src';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await client.connect();
  await client.query('DELETE FROM users');
  await client.end();
});

describe('Authenticate a user', () => {
  it('should authenticate a user', async () => {
    await request(app).post('/register').send({
      username: 'login user',
      email: 'auth@test.com',
      password: 'password',
      confirmPassword: 'password',
    });

    const response = await request(app).post('/login').send({
      email: 'auth@test.com',
      password: 'password',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate if user not exists', async () => {
    const response = await request(app).post('/login').send({
      email: 'user-net-exists@test.com',
      password: 'password',
    });

    expect(response.body.message).toBe('User not found');
  });
});
