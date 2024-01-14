import request from 'supertest';
import { app } from '../../app';
import { createJwtSession } from '../../test/session-helper';

it('throws 404 when route not found', async () => {
  const res = await request(app).post('/api/tickets').send({});

  expect(res.statusCode).not.toEqual(404);
});

// describe('Throws error if user is signed in', () => {
//   it('returns status other than 401 on post req /api/tickets', async () => {
//     const res = await request(app)
//       .post('/api/tickets')
//       // .set('Cookie', global.signin())
//       .set('Cookie', await createJwtSession())
//       .send({});
//     console.log(res.status);
//     expect(res.statusCode).not.toEqual(401);
//   });
// });
