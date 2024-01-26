import { Message } from 'node-nats-streaming';
import { Listener } from './abstract-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subject } from './subject';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // subject = 'ticket:created';
  subject = Subject.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log(data);
    msg.ack();
  }
}
