import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

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

  const options = stan.subscriptionOptions().setManualAckMode(true);
  const subscription = stan.subscribe(
    'ticket:created',
    'ticket-queue-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    const sequence = msg.getSequence();
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log('Received a message [' + sequence + '] ' + data);
    }

    msg.ack();
  });
});

// gracefully shutdown on interruption & termination
process.on('SIGTERM', () => stan.close()); // C
process.on('SIGINT', () => stan.close()); // Restart
