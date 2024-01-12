import request from 'supertest';
import { app } from '@/app';

it('throws 404 when route not found', async () => {
  const res = await request(app).post('/api/tickets').send({});

  expect(res.statusCode).toEqual(404);
});
