import request from 'supertest';
import { app } from '../../app';
import { createJwtSession } from '../../test/session-helper';
// import { Ticket } from '@/model/tickets';
import { Ticket } from '../../model/tickets';

describe('Ticket API', () => {
  it('returns 200 for GET /api/tickets', async () => {
    const res = await request(app).get('/api/tickets');
    expect(res.status).toEqual(200);
  });

  it('returns 401 for POST /api/tickets when not authenticated', async () => {
    const res = await request(app).post('/api/tickets').send({});
    expect(res.status).toEqual(401);
  });

  it('returns other than 401 for POST /api/tickets when authenticated', async () => {
    const cookie = createJwtSession();
    const res = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: 'test', price: 10 });
    expect(res.status).not.toEqual(401);
  });

  it('returns 400 for POST /api/tickets with invalid data', async () => {
    const cookie = createJwtSession();

    // Valid price
    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: '', price: 10 })
      .expect(400);
    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ price: 10 })
      .expect(400);

    // Valid title
    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: 'validTitle', price: -10 })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: 'validTitle' })
      .expect(400);
  });

  it('returns 201 for post /api/tickets', async () => {
    const cookie = createJwtSession();
    const title = 'Valid String';
    const price = 10;

    // Check No Records is present
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    //Make a secured req creating a ticket
    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title, price })
      .expect(201);

    //Check if record was created
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);
  });
});
