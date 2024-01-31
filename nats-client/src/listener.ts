import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/listener/ticket-created-listener';
import { TicketUpdatedListener } from './events/listener/ticket-updated-listener';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('listen');

  stan.on('close', () => {
    console.log('Closing connection');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
  new TicketUpdatedListener(stan).listen();
});

// gracefully shutdown on interruption & termination
process.on('SIGTERM', () => stan.close()); // C
process.on('SIGINT', () => stan.close()); // Restart
