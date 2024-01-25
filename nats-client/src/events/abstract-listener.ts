import { Message, Stan } from 'node-nats-streaming';

export abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;

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
