import request from 'supertest';
import { app } from '../../app';
import { createJwtSession } from '../../test/session-helper';
import { Ticket } from '../../model/tickets';

const createTicket = async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', createJwtSession())
    .send({
      title: 'valid',
      price: 10,
    });
};

describe('Retrieve All tickets', () => {
  it('returns 200 for get /api/tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const ticket = await Ticket.find({});

    const response = await request(app).get('/api/tickets').send().expect(200);

    expect(response.body.length).toEqual(ticket.length);
  });
});
