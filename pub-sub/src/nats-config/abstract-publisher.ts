import { Stan } from 'node-nats-streaming';
import { Subject } from './subject';

interface Event {
  subject: Subject;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  private stan: Stan;
  constructor(client: Stan) {
    this.stan = client;
  }

  publish(data: T['data']) {
    return new Promise<void>((resolve, reject) => {
      this.stan.publish(this.subject, JSON.stringify(data), (err, guid) => {
        if (err) {
          reject(err);
        }
        console.log(`Published at ${this.subject} - guid ${guid}`);
        resolve();
      });
    });
  }
}
