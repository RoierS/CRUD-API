import request from 'supertest';
import { users } from '../db/users';
import { server } from '..';

describe('Users API', () => {
  beforeEach(() => {
    users.length = 0;
  });

  it('GET Request to /api/users - should return an empty array initially', async () => {
    const { statusCode, body } = await request(server).get('/api/users');
    expect(statusCode).toEqual(200);
    expect(body).toEqual([]);
  });

  it('POST Request to /api/users - should create a new user', async () => {
    const newUser = { username: 'John Doe', age: 30, hobbies: ['reading'] };

    const { statusCode, body } = await request(server)
      .post('/api/users')
      .send(newUser);

    expect(statusCode).toEqual(201);
    expect(body).toHaveProperty('id');
    expect(body).toMatchObject(newUser);
  });

  it('GET Request to /api/users/:id - should return the created user by id', async () => {
    const newUser = { username: 'Test User', age: 35, hobbies: ['swimming'] };

    const postRes = await request(server).post('/api/users').send(newUser);

    const createdUserId = postRes.body.id;

    const { statusCode, body } = await request(server).get(
      `/api/users/${createdUserId}`,
    );

    expect(statusCode).toEqual(200);
    expect(body).toMatchObject(newUser);
  });

  it('DELETE Request to /api/users/:id - should delete the user by id', async () => {
    const newUser = {
      username: 'User to Delete',
      age: 18,
      hobbies: ['test'],
    };

    const postRes = await request(server).post('/api/users').send(newUser);
    const createdUserId = postRes.body.id;

    const { statusCode } = await request(server).delete(
      `/api/users/${createdUserId}`,
    );
    expect(statusCode).toEqual(204);
  });
});
