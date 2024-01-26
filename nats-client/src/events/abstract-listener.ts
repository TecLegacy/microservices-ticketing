import { Message, Stan } from 'node-nats-streaming';
import { Subject } from './subject';

interface Event {
  subject: Subject;
  data: any;
}
export abstract class Listener<T extends Event> {
  // abstract subject: string;
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;

  private stan: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.stan = client;
  }

  subscriberOptions() {
    return this.stan
      .subscriptionOptions()
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
      .setDeliverAllAvailable()
      .setManualAckMode(true);
  }

  parseMessage(msg: Message) {
    const message = msg.getData();
    return typeof message === 'string'
      ? JSON.parse(message)
      : JSON.parse(message.toString('utf8'));
  }

  listen() {
    const subscription = this.stan.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriberOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        'Received a message [' + msg.getSequence() + '] ' + msg.getData()
      );

      const data = this.parseMessage(msg);
      this.onMessage(data, msg);
    });
  }
}
