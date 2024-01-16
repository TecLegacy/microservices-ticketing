import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { createJwtSession } from '../../test/session-helper';
import { Ticket } from '../../model/tickets';

describe('Ticket API show all tickets ', () => {
  it('returns 401 for put /api/tickets/:id must be logged In', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: 'valid', price: 10 })
      .expect(401);
  });
  it('returns 401 for put /api/tickets/:id must be same user', async () => {
    // createJwtSession() -> generates Random Id's
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', createJwtSession()) // random id 1
      .send({ title: 'valid', price: 10 });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', createJwtSession()) // random id 2
      .send({ title: 'updated', price: 1010 })
      .expect(401);
  });

  it('returns 200 for put /api/tickets/:id with same user', async () => {
    //Reference for same id
    const cookie = createJwtSession();

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: 'valid', price: 10 });
    const ticketUpdateResponse = await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({ title: 'updated', price: 1010 })
      .expect(200);

    // fetch ticket and see if it was updated
    const ticket = await Ticket.findById(ticketUpdateResponse.body.id);
    expect(ticket!.title).toEqual('updated');
    expect(ticket!.price).toEqual(1010);

    const fetchTicket = await request(app)
      .get(`/api/tickets/${ticketUpdateResponse.body.id}`)
      .send();

    expect(fetchTicket.body.title).toEqual('updated');
    expect(fetchTicket.body.price).toEqual(1010);
  });

  it('returns 400 for put /api/tickets/:id invalid data', async () => {
    //Reference for same id
    const cookie = createJwtSession();

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: 'valid', price: 10 });
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({ title: '', price: 1010 })
      .expect(400);
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({ title: 'validtitle', price: -1010 })
      .expect(400);
  });
});
