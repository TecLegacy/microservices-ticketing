import { app } from '../../app';
import request from 'supertest';

//Test that a user can be created successfully 201 with valid email and password
it('returns 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

//Test that returns 400 when password and email are not specified
it('returns 400 empty password & email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);
});

//Test that a user cannot be created with an email that is already in use
it('returns a 400 when signing up with registered email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

// Returns a Response with a cookie - header
it('sets cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
  // console.log(response);

  expect(response.get('Set-Cookie')).toBeDefined();
});
