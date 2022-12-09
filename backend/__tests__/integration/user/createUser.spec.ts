import { Client } from 'pg';
import request from 'supertest';
import { app } from '../../../src';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();
});

describe('Create a user', () => {
  it('should create a user', async () => {
    const response = await request(app).post('/register').send({
      username: 'test user',
      email: 'new-email@test.com',
      password: 'password',
      confirmPassword: 'password',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should not create a user if email already exists', async () => {
    const response = await request(app).post('/register').send({
      username: 'user already exists',
      email: 'new-email@test.com',
      password: 'password',
      confirmPassword: 'password',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  it('should not create a user with invalid username', async () => {
    const response = await request(app).post('/register').send({
      username: 'u',
      email: 'new-email@test.com',
      password: 'password',
      confirmPassword: 'password',
    });

    expect(response.status).toBe(400);
    expect(response.body.issues[0].code).toBe('too_small');
  });

  it('should not create a user with invalid username', async () => {
    const response = await request(app).post('/register').send({
      username: 'invalid-email',
      email: 'new-email&test-com',
      password: 'password',
      confirmPassword: 'password',
    });

    expect(response.status).toBe(400);
    expect(response.body.issues[0].message).toBe('Invalid email');
  });
});
