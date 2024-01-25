import nats from 'node-nats-streaming';
console.clear();
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Connected');
  const ticket = {
    id: 1,
    price: 20,
    title: 'concert',
  };
  stan.publish('ticket:created', JSON.stringify(ticket), (err, guid) => {
    if (err) {
      console.log('publish failed: ' + err);
    } else {
      console.log('published message with guid: ' + guid);
    }
  });
});
