import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { createJwtSession } from '../../test/session-helper';
import { Ticket } from '../../model/tickets';

describe('Ticket API show all tickets ', () => {
  it('returns 404 for get /api/tickets/:id invalid article id', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`).expect(404);
  });

  it('returns 200 for get /api/tickets/:id  valid id ', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    //Create a Ticket
    let ticket = await Ticket.find({});
    expect(ticket.length).toEqual(0);

    const res = await request(app)
      .post('/api/tickets')
      .set('Cookie', createJwtSession())
      .send({ title: 'validTitle', price: 10 });

    // Retrieve tickets
    await request(app).get(`/api/tickets/${res.body.id}`).expect(200);

    ticket = await Ticket.find({});
    expect(ticket[0].title).toEqual(res.body.title);
    expect(ticket[0].price).toEqual(res.body.price);
  });
});
