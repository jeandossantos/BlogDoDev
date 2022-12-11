import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import { Client } from 'pg';

import { app } from '../../../src';
import { prisma } from '../../../src/connection/prisma';

beforeAll(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query('delete from tags');
  await client.query('delete from users');
  await client.end();

  await prisma.tag.create({
    data: {
      name: 'tag test list',
    },
  });
});

describe('list tags', () => {
  it('should return a list of tags', async () => {
    const response = await request(app).get('/tags');

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});
