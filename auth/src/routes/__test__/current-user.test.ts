import request from 'supertest';
import { app } from '../../app';
import { cookieHelper } from '../../test/cookie-helper';

it('Returns a cookie of current user', async () => {
  const cookie = await cookieHelper();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('Returns a null if user in not signed in ', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
