import { app } from '../../app';
import request from 'supertest';

//Test that a user can be signed successfully 200 with valid email and password
it('returns 200 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
});

//Test that a user cant be signed successfully 400 with valid email and invalid password
it('returns 200 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'passwords' })
    .expect(400);
});

//Test that a user can be signed successfully 200 with valid email and password WITH COOKIE
it('returns 200 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

//Test that returns 400 when a singing up with an email not registered
it('returns 400 when a email is not registered', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});
