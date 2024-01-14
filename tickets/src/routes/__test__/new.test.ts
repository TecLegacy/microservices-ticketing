import request from 'supertest';
import { app } from '../../app';
import { createJwtSession } from '../../test/session-helper';

it('throws 404 when route not found', async () => {
  const res = await request(app).post('/api/tickets').send({});

  expect(res.statusCode).not.toEqual(404);
});

describe('Throws error if user is signed in', () => {
  it('returns status other than 401 on post req /api/tickets', async () => {
    const cookie = await createJwtSession();
    const res = await request(app)
      .post('/api/tickets')
      // .set('Cookie', global.signin())
      .set('Cookie', cookie)
      .send({});
    // .expect(401);

    console.log('s', res);

    expect(res.status).not.toEqual(401);
  });
});
