import { Message } from 'node-nats-streaming';
import { Listener } from './abstract-listener';

export class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payments-service';

  onMessage(data: any, msg: Message): void {
    console.log(data);
    msg.ack();
  }
}
