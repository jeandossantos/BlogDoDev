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
      username: 'test user',
      email: 'new-email@test.com',
      password: 'password',
      confirmPassword: 'password',
    });

    const response = await request(app).post('/login').send({
      email: 'new-email@test.com',
      password: 'password',
    });

    expect(response.body).toHaveProperty('token');
  });
});
