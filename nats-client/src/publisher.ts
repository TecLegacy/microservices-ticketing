import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear();
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Connected');
  const ticket = {
    id: '1',
    price: 20,
    title: 'concert',
    user: 'axiosdas2',
  };

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish(ticket);
  } catch (err) {
    console.log(err);
  }
});
